/**
 * Seed script: uploads migrated media to Supabase Storage and inserts the
 * cleaned legacy records (scripts/out/*.json) into Postgres.
 *
 * Usage:  node scripts/seed.mjs
 * Needs: SUPABASE_URL + SUPABASE_SECRET_KEY in .env
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { config } from "dotenv";

const HERE = dirname(fileURLToPath(import.meta.url));
config({ path: join(HERE, "..", ".env") });

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SECRET_KEY;
if (!url || !key) {
  console.error("Missing SUPABASE_URL / SUPABASE_SECRET_KEY in .env");
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });
const outDir = join(HERE, "out");
const mediaDir = join(HERE, "variants");

const read = (name) =>
  JSON.parse(readFileSync(join(outDir, `${name}.json`), "utf-8"));

async function uploadBucketFiles() {
  // full/ + thumb/ are the live variants. The byte-identical originals stay
  // in site/originals-archive/ (local only, not deployed, not in the bucket).
  const dirs = ["full", "thumb"];
  // fetch existing bucket listings once per directory
  const existing = {};
  for (const dir of dirs) {
    const { data } = await supabase.storage.from("media").list(dir, { limit: 1000 });
    existing[dir] = new Set((data || []).map((e) => e.name));
  }
  let uploaded = 0, skipped = 0, failed = 0;
  for (const dir of dirs) {
    const local = join(mediaDir, dir);
    let files = [];
    try { files = readdirSync(local); } catch { continue; }
    for (const f of files) {
      if (existing[dir].has(f)) {
        skipped++;
        continue;
      }
      const buf = readFileSync(join(local, f));
      const ctype = f.endsWith(".webp")
        ? "image/webp"
        : f.endsWith(".png")
          ? "image/png"
          : "image/jpeg";
      const { error } = await supabase.storage
        .from("media")
        .upload(`${dir}/${f}`, buf, { contentType: ctype, upsert: true });
      if (error) {
        failed++;
        console.error(`  upload FAIL ${dir}/${f}: ${error.message}`);
      } else {
        uploaded++;
        existing[dir].add(f);
      }
    }
  }
  console.log(`storage: ${uploaded} uploaded, ${skipped} already present, ${failed} failed`);
}

function publicUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${url}/storage/v1/object/public/media/${path}`;
}

async function insertProperties() {
  const rows = read("properties").map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    location: p.location,
    locality: p.locality,
    price_inr: p.price_inr,
    price_display: p.price_display,
    bhk_type: p.bhk_type,
    property_type: p.property_type,
    possession_status: p.possession_status,
    furnishing_status: p.furnishing_status || "",
    area_sqft: p.area_sqft,
    bathrooms: p.bathrooms,
    balconies: p.balconies,
    floor: p.floor,
    facing: p.facing,
    parking: p.parking,
    amenities: p.amenities,
    landmarks: p.landmarks,
    description: p.description,
    category: p.category,
    status: p.status,
    main_image: publicUrl(p.main_image),
    main_image_thumb: publicUrl(p.main_image_thumb),
    developer_name: p.developer_name,
    instagram_url: p.instagram_url,
    is_featured: p.is_featured,
    is_published: p.is_published,
    created_at: p.created_at,
  }));
  const { error } = await supabase.from("properties").upsert(rows, { onConflict: "id" });
  if (error) throw error;
  console.log(`properties: ${rows.length} upserted`);
}

async function insertImages() {
  // The migration expands shared legacy galleries across duplicate listings.
  // A source image seeded for multiple listings needs a distinct PK per
  // (image, listing) pair; derive it deterministically so re-runs upsert.
  const rows = read("property_images").map((r) => ({
    id: deriveImageId(r.id, r.property_uuid),
    property_id: r.property_uuid,
    sort_order: r.order,
    caption: r.caption || "",
    alt_text: r.alt_text || "",
    image_url: publicUrl(r.image_url),
    thumb_url: publicUrl(r.thumb_url),
  }));
  const { error } = await supabase.from("property_images").upsert(rows, { onConflict: "id" });
  if (error) throw error;
  console.log(`property_images: ${rows.length} upserted`);
}

/** Deterministic uuid-format id for (legacy image id, property uuid) pairs.
 *  sha1 of the pair, formatted as uuid; stable across re-runs. */
function deriveImageId(legacyId, propertyUuid) {
  const h = createHash("sha1").update(`${legacyId}|${propertyUuid}`).digest("hex");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20, 32)}`;
}

async function insertVideos() {
  const rows = read("property_videos").map((r) => ({
    id: r.id,
    property_id: r.property_uuid,
    embed_url: r.embed_url,
    thumbnail: publicUrl(r.thumbnail),
    label: r.label,
  }));
  if (rows.length) {
    const { error } = await supabase.from("property_videos").upsert(rows, { onConflict: "id" });
    if (error) throw error;
  }
  console.log(`property_videos: ${rows.length} upserted`);
}

async function insertReels() {
  const rows = read("reels").map((r) => ({
    id: r.id,
    title: r.reel_title || r.title,
    reel_url: r.reel_url,
    embed_url: r.embed_url,
    cover_image: publicUrl(r.cover_image),
    cover_thumb: publicUrl(r.cover_thumb),
    display_order: r.display_order,
  }));
  const { error } = await supabase.from("reels").upsert(rows, { onConflict: "id" });
  if (error) throw error;
  console.log(`reels: ${rows.length} upserted`);
}

async function insertBlog() {
  const rows = read("blog_posts").map((b) => ({
    id: b.id,
    slug: b.slug,
    title: b.title,
    publish_date: b.publish_date,
    author: b.author,
    cover_image: publicUrl(b.cover_image),
    cover_thumb: publicUrl(b.cover_thumb),
    content: b.content,
    excerpt: b.content.split("\n")[0]?.slice(0, 160) || "",
    is_published: b.is_published,
  }));
  const { error } = await supabase.from("blog_posts").upsert(rows, { onConflict: "id" });
  if (error) throw error;
  console.log(`blog_posts: ${rows.length} upserted`);
}

async function insertTestimonials() {
  const rows = read("testimonials").map((t) => ({
    id: t.id,
    client_name: t.client_name,
    client_location: t.client_location,
    rating: t.rating,
    review_text: t.review_text,
    review_date: t.review_date,
    client_photo: publicUrl(t.client_photo),
    is_published: t.is_published,
  }));
  const { error } = await supabase.from("testimonials").upsert(rows, { onConflict: "id" });
  if (error) throw error;
  console.log(`testimonials: ${rows.length} upserted (is_published=false)`);
}

async function insertFaqs() {
  const rows = read("faqs").map((f) => ({
    id: f.id,
    question: f.question,
    answer: f.answer,
    category: f.category,
    display_order: f.display_order,
    is_published: f.is_published,
  }));
  const { error } = await supabase.from("faqs").upsert(rows, { onConflict: "id" });
  if (error) throw error;
  console.log(`faqs: ${rows.length} upserted`);
}

async function main() {
  console.log("seeding " + url);
  await uploadBucketFiles();
  await insertProperties();
  await insertImages();
  await insertVideos();
  await insertReels();
  await insertBlog();
  await insertTestimonials();
  await insertFaqs();
  console.log("\nSEED COMPLETE");
}

main().catch((e) => {
  console.error("SEED FAILED:", e.message);
  process.exit(1);
});
