/**
 * CMS helpers. All mutations run through the browser client with the
 * authenticated session; RLS (is_admin) enforces authorization server-side.
 * Uploads go to the public `media` bucket under full/ and thumb/.
 */

import { getSupabaseBrowser } from "./supabase";
import type { Property, PropertyImage } from "./types";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;

export const publicUrl = (path: string) => `${SUPABASE_URL}/storage/v1/object/public/media/${path}`;

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
