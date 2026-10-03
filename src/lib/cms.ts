/**
 * CMS helpers. All mutations run through the browser client with the
 * authenticated session; RLS (is_admin) enforces authorization server-side.
 * Uploads go to the public `media` bucket under full/ and thumb/.
 */

import { getSupabaseBrowser } from "./supabase";
import type { BlogPost, Faq, Partner, Property, PropertyImage, Reel, Testimonial } from "./types";

const env = (globalThis as unknown as { process?: { env?: Record<string, string | undefined> } }).process?.env;

const SUPABASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_URL) ||
  env?.VITE_SUPABASE_URL ||
  env?.SUPABASE_URL ||
  "https://vuvxmzrthcitfagwebgm.supabase.co";

const publicUrl = (path: string) => `${SUPABASE_URL}/storage/v1/object/public/media/${path}`;

/**
 * Client-side image prep: re-encodes to WebP at two sizes.
 * Kept in the browser so the worker stays light and uploads are small.
 */
async function encodeVariants(file: File): Promise<{ full: Blob; thumb: Blob }> {
  const bitmap = await createImageBitmap(file);
  const make = async (maxW: number, quality: number) => {
    const scale = Math.min(1, maxW / bitmap.width);
    const w = Math.round(bitmap.width * scale);
    const h = Math.round(bitmap.height * scale);
    const canvas = new OffscreenCanvas(w, h);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, w, h);
    return canvas.convertToBlob({ type: "image/webp", quality });
  };
  const full = await make(1600, 0.82);
  const thumb = await make(900, 0.78);
  bitmap.close();
  return { full, thumb };
}

export async function uploadPropertyImage(file: File, propertyId: string) {
  const supabase = getSupabaseBrowser();
  const { full, thumb } = await encodeVariants(file);
  const stamp = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  const base = `prop-${propertyId.slice(0, 8)}-${stamp}-${rand}`;

  const { error: e1 } = await supabase.storage
    .from("media")
    .upload(`full/${base}.webp`, full, { contentType: "image/webp" });
  if (e1) throw e1;
  const { error: e2 } = await supabase.storage
    .from("media")
    .upload(`thumb/${base}.webp`, thumb, { contentType: "image/webp" });
  if (e2) throw e2;

  return {
    image_url: publicUrl(`full/${base}.webp`),
    thumb_url: publicUrl(`thumb/${base}.webp`),
  };
}

/** Slug from title; caller ensures uniqueness. */
export function slugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90) || "listing";
}

/** Price string ("1.35 Cr", "68 lakhs", "7200000") -> INR number. */
export function parsePriceInput(input: string): number | null {
  const text = input.replace(/[₹,\s]/g, "").toLowerCase();
  if (!text) return null;
  const m = text.match(/^([\d.]+)(cr|crore|crores|l|lac|lacs|lakh|lakhs)?$/);
  if (!m) {
    const plain = Number(text);
    return Number.isFinite(plain) && plain > 0 ? plain : null;
  }
  const num = Number(m[1]);
  const unit = m[2] || "";
  if (unit.startsWith("cr")) return num * 1e7;
  if (unit.startsWith("l")) return num * 1e5;
  return num > 0 ? num : null;
}

/* ---------------- CRUD ---------------- */

export async function createProperty(input: Omit<Property, "id" | "created_at" | "updated_at">) {
  const supabase = getSupabaseBrowser();
  const { data, error } = await supabase.from("properties").insert(input).select().single();
  if (error) throw error;
  return data as Property;
}

export async function updateProperty(id: string, patch: Partial<Property>) {
  const supabase = getSupabaseBrowser();
  const { data, error } = await supabase.from("properties").update(patch).eq("id", id).select().single();
  if (error) throw error;
  return data as Property;
}

export async function deleteProperty(id: string) {
  const supabase = getSupabaseBrowser();
  const { error } = await supabase.from("properties").delete().eq("id", id);
  if (error) throw error;
}

export async function addImageRow(row: Omit<PropertyImage, "id" | "created_at">) {
  const supabase = getSupabaseBrowser();
  const { data, error } = await supabase.from("property_images").insert(row).select().single();
  if (error) throw error;
  return data as PropertyImage;
}

export async function deleteImageRow(id: string) {
  const supabase = getSupabaseBrowser();
  const { error } = await supabase.from("property_images").delete().eq("id", id);
  if (error) throw error;
}

export async function reorderImages(propertyId: string, orderedIds: string[]) {
  const supabase = getSupabaseBrowser();
  await Promise.all(
    orderedIds.map((imgId, i) =>
      supabase.from("property_images").update({ sort_order: i }).eq("id", imgId),
    ),
  );
}

/* ---------------- content: reels, posts, testimonials, faqs, partners, settings ---------------- */

/**
 * Instagram reel URL -> id + embed URL. Accepts:
 *   https://www.instagram.com/reel/DbqdwlJPfz2/
 *   https://instagram.com/reel/DbqdwlJPfz2/?igsh=...
 *   https://www.instagram.com/p/DbqdwlJPfz2/   (post-style, also works in embeds)
 *   https://www.instagram.com/username/reel/DbqdwlJPfz2/
 */
export function parseInstagramUrl(raw: string): { id: string; type: "p" | "reel"; reelUrl: string; embedUrl: string } | null {
  const url = raw.trim();
  const m = url.match(/instagram\.com\/(?:[^/]+\/)?(reel|reels|p|tv)\/([A-Za-z0-9_-]+)/i);
  if (!m) return null;
  const rawType = m[1]!.toLowerCase();
  const type: "p" | "reel" = rawType === "p" ? "p" : "reel";
  const id = m[2]!;
  return {
    id,
    type,
    reelUrl: `https://www.instagram.com/${type}/${id}/`,
    embedUrl: `https://www.instagram.com/${type}/${id}/embed`,
  };
}

export async function saveReel(input: {
  id?: string;
  title: string;
  url: string;
  cover?: string;
  coverThumb?: string;
  displayOrder: number;
  isPublished: boolean;
}) {
  const supabase = getSupabaseBrowser();
  const parsed = parseInstagramUrl(input.url);
  if (!parsed) throw new Error("That does not look like an Instagram reel link.");
  const row = {
    id: input.id ?? `reel-${parsed.id.toLowerCase()}`,
    title: input.title.trim() || "Untitled reel",
    reel_url: parsed.reelUrl,
    embed_url: parsed.embedUrl,
    cover_image: input.cover ?? "",
    cover_thumb: input.coverThumb ?? "",
    display_order: input.displayOrder,
    is_published: input.isPublished,
  };
  const { data, error } = await supabase.from("reels").upsert(row).select().single();
  if (error) throw error;
  return data as Reel;
}

export async function deleteReel(id: string) {
  const supabase = getSupabaseBrowser();
  const { error } = await supabase.from("reels").delete().eq("id", id);
  if (error) throw error;
}

export async function uploadReelCover(file: File): Promise<{ cover: string; thumb: string }> {
  const { full, thumb } = await encodeVariants(file);
  const stamp = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  const base = `reel-cover-${stamp}-${rand}`;
  const supabase = getSupabaseBrowser();
  const { error: e1 } = await supabase.storage
    .from("media")
    .upload(`full/${base}.webp`, full, { contentType: "image/webp" });
  if (e1) throw e1;
  const { error: e2 } = await supabase.storage
    .from("media")
    .upload(`thumb/${base}.webp`, thumb, { contentType: "image/webp" });
  if (e2) throw e2;
  return { cover: publicUrl(`full/${base}.webp`), thumb: publicUrl(`thumb/${base}.webp`) };
}

/* ---- journal ---- */

export async function upsertBlogPost(input: {
  id?: string;
  slug: string;
  title: string;
  publishDate: string;
  author: string;
  cover?: string;
  coverThumb?: string;
  content: string;
  excerpt: string;
  isPublished: boolean;
}) {
  const supabase = getSupabaseBrowser();
  const row = {
    id: input.id ?? input.slug,
    slug: input.slug,
    title: input.title.trim(),
    publish_date: input.publishDate || new Date().toISOString().slice(0, 10),
    author: input.author.trim() || "Editorial Team",
    cover_image: input.cover ?? "",
    cover_thumb: input.coverThumb ?? "",
    content: input.content,
    excerpt: input.excerpt,
    is_published: input.isPublished,
    updated_at: new Date().toISOString(),
  };
  const { data, error } = await supabase.from("blog_posts").upsert(row).select().single();
  if (error) throw error;
  return data as BlogPost;
}

export async function deleteBlogPost(id: string) {
  const supabase = getSupabaseBrowser();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw error;
}

/* ---- testimonials ---- */

export async function upsertTestimonial(input: {
  id?: string;
  clientName: string;
  clientLocation: string;
  rating: number;
  reviewText: string;
  reviewDate: string | null;
  isPublished: boolean;
}) {
  const supabase = getSupabaseBrowser();
  const row = {
    ...(input.id ? { id: input.id } : {}),
    client_name: input.clientName.trim(),
    client_location: input.clientLocation.trim(),
    rating: Math.min(5, Math.max(1, input.rating)),
    review_text: input.reviewText.trim(),
    review_date: input.reviewDate,
    is_published: input.isPublished,
  };
  const { data, error } = await supabase.from("testimonials").upsert(row).select().single();
  if (error) throw error;
  return data as Testimonial;
}

export async function deleteTestimonial(id: string) {
  const supabase = getSupabaseBrowser();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw error;
}

/* ---- faqs ---- */

export async function upsertFaq(input: {
  id?: string;
  question: string;
  answer: string;
  category: string;
  displayOrder: number;
  isPublished: boolean;
}) {
  const supabase = getSupabaseBrowser();
  const slug = input.id ?? `faq-${slugFromTitle(input.question)}`;
  const row = {
    id: slug,
    question: input.question.trim(),
    answer: input.answer.trim(),
    category: input.category.trim() || "General",
    display_order: input.displayOrder,
    is_published: input.isPublished,
  };
  const { data, error } = await supabase.from("faqs").upsert(row).select().single();
  if (error) throw error;
  return data as Faq;
}

export async function deleteFaq(id: string) {
  const supabase = getSupabaseBrowser();
  const { error } = await supabase.from("faqs").delete().eq("id", id);
  if (error) throw error;
}

/* ---- partners ---- */

export async function upsertPartner(input: {
  id?: string;
  name: string;
  slug: string;
  logoUrl: string;
  websiteUrl: string;
  description: string;
  displayOrder: number;
  isPublished: boolean;
}) {
  const supabase = getSupabaseBrowser();
  const row = {
    ...(input.id ? { id: input.id } : {}),
    name: input.name.trim(),
    slug: input.slug.trim() || slugFromTitle(input.name),
    logo_url: input.logoUrl.trim(),
    website_url: input.websiteUrl.trim(),
    description: input.description.trim(),
    display_order: input.displayOrder,
    is_published: input.isPublished,
  };
  const { data, error } = await supabase.from("partners").upsert(row).select().single();
  if (error) throw error;
  return data as Partner;
}

export async function deletePartner(id: string) {
  const supabase = getSupabaseBrowser();
  const { error } = await supabase.from("partners").delete().eq("id", id);
  if (error) throw error;
}

/** Partner logo upload -> media bucket, returns public URL (single size). */
export async function uploadPartnerLogo(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1600 / bitmap.width);
  const canvas = new OffscreenCanvas(
    Math.round(bitmap.width * scale),
    Math.round(bitmap.height * scale),
  );
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const blob = await canvas.convertToBlob({ type: "image/webp", quality: 0.9 });
  bitmap.close();
  const stamp = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  const base = `partner-${stamp}-${rand}`;
  const supabase = getSupabaseBrowser();
  const { error } = await supabase.storage
    .from("media")
    .upload(`full/${base}.webp`, blob, { contentType: "image/webp" });
  if (error) throw error;
  return publicUrl(`full/${base}.webp`);
}

/* ---- site settings ---- */

export async function saveSettings(entries: Record<string, string>) {
  const supabase = getSupabaseBrowser();
  const rows = Object.entries(entries).map(([key, value]) => ({ key, value }));
  const { error } = await supabase.from("site_settings").upsert(rows, { onConflict: "key" });
  if (error) throw error;
}
