import { t as getSupabaseBrowser } from "./supabase-DLBQfxwj.js";
//#region src/lib/cms.ts
/**
* CMS helpers. All mutations run through the browser client with the
* authenticated session; RLS (is_admin) enforces authorization server-side.
* Uploads go to the public `media` bucket under full/ and thumb/.
*/
var env = globalThis.process?.env;
var SUPABASE_URL = typeof import.meta !== "undefined" && "https://vuvxmzrthcitfagwebgm.supabase.co" || env?.VITE_SUPABASE_URL || env?.SUPABASE_URL || "https://vuvxmzrthcitfagwebgm.supabase.co";
var publicUrl = (path) => `${SUPABASE_URL}/storage/v1/object/public/media/${path}`;
/**
* Client-side image prep: re-encodes to WebP at two sizes.
* Kept in the browser so the worker stays light and uploads are small.
*/
async function encodeVariants(file) {
	const bitmap = await createImageBitmap(file);
	const make = async (maxW, quality) => {
		const scale = Math.min(1, maxW / bitmap.width);
		const w = Math.round(bitmap.width * scale);
		const h = Math.round(bitmap.height * scale);
		const canvas = new OffscreenCanvas(w, h);
		canvas.getContext("2d").drawImage(bitmap, 0, 0, w, h);
		return canvas.convertToBlob({
			type: "image/webp",
			quality
		});
	};
	const full = await make(1600, .82);
	const thumb = await make(900, .78);
	bitmap.close();
	return {
		full,
		thumb
	};
}
async function uploadPropertyImage(file, propertyId) {
	const supabase = getSupabaseBrowser();
	const { full, thumb } = await encodeVariants(file);
	const stamp = Date.now().toString(36);
	const rand = Math.random().toString(36).slice(2, 8);
	const base = `prop-${propertyId.slice(0, 8)}-${stamp}-${rand}`;
	const { error: e1 } = await supabase.storage.from("media").upload(`full/${base}.webp`, full, { contentType: "image/webp" });
	if (e1) throw e1;
	const { error: e2 } = await supabase.storage.from("media").upload(`thumb/${base}.webp`, thumb, { contentType: "image/webp" });
	if (e2) throw e2;
	return {
		image_url: publicUrl(`full/${base}.webp`),
		thumb_url: publicUrl(`thumb/${base}.webp`)
	};
}
/** Slug from title; caller ensures uniqueness. */
function slugFromTitle(title) {
	return title.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 90) || "listing";
}
/** Price string ("1.35 Cr", "68 lakhs", "7200000") -> INR number. */
function parsePriceInput(input) {
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
async function createProperty(input) {
	const { data, error } = await getSupabaseBrowser().from("properties").insert(input).select().single();
	if (error) throw error;
	return data;
}
async function updateProperty(id, patch) {
	const { data, error } = await getSupabaseBrowser().from("properties").update(patch).eq("id", id).select().single();
	if (error) throw error;
	return data;
}
async function deleteProperty(id) {
	const { error } = await getSupabaseBrowser().from("properties").delete().eq("id", id);
	if (error) throw error;
}
async function addImageRow(row) {
	const { data, error } = await getSupabaseBrowser().from("property_images").insert(row).select().single();
	if (error) throw error;
	return data;
}
async function deleteImageRow(id) {
	const { error } = await getSupabaseBrowser().from("property_images").delete().eq("id", id);
	if (error) throw error;
}
async function reorderImages(propertyId, orderedIds) {
	const supabase = getSupabaseBrowser();
	await Promise.all(orderedIds.map((imgId, i) => supabase.from("property_images").update({ sort_order: i }).eq("id", imgId)));
}
/**
* Instagram reel URL -> id + embed URL. Accepts:
*   https://www.instagram.com/reel/DbqdwlJPfz2/
*   https://instagram.com/reel/DbqdwlJPfz2/?igsh=...
*   https://www.instagram.com/p/DbqdwlJPfz2/   (post-style, also works in embeds)
*   https://www.instagram.com/sspropertykol/reel/DbqdwlJPfz2/
*/
function parseInstagramUrl(raw) {
	const m = raw.trim().match(/instagram\.com\/(?:[^/]+\/)?(reel|reels|p|tv)\/([A-Za-z0-9_-]+)/i);
	if (!m) return null;
	const type = m[1].toLowerCase() === "p" ? "p" : "reel";
	const id = m[2];
	return {
		id,
		type,
		reelUrl: `https://www.instagram.com/${type}/${id}/`,
		embedUrl: `https://www.instagram.com/${type}/${id}/embed`
	};
}
async function saveReel(input) {
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
		is_published: input.isPublished
	};
	const { data, error } = await supabase.from("reels").upsert(row).select().single();
	if (error) throw error;
	return data;
}
async function deleteReel(id) {
	const { error } = await getSupabaseBrowser().from("reels").delete().eq("id", id);
	if (error) throw error;
}
async function uploadReelCover(file) {
	const { full, thumb } = await encodeVariants(file);
	const base = `reel-cover-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
	const supabase = getSupabaseBrowser();
	const { error: e1 } = await supabase.storage.from("media").upload(`full/${base}.webp`, full, { contentType: "image/webp" });
	if (e1) throw e1;
	const { error: e2 } = await supabase.storage.from("media").upload(`thumb/${base}.webp`, thumb, { contentType: "image/webp" });
	if (e2) throw e2;
	return {
		cover: publicUrl(`full/${base}.webp`),
		thumb: publicUrl(`thumb/${base}.webp`)
	};
}
async function upsertBlogPost(input) {
	const supabase = getSupabaseBrowser();
	const row = {
		id: input.id ?? input.slug,
		slug: input.slug,
		title: input.title.trim(),
		publish_date: input.publishDate || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		author: input.author.trim() || "SS Property",
		cover_image: input.cover ?? "",
		cover_thumb: input.coverThumb ?? "",
		content: input.content,
		excerpt: input.excerpt,
		is_published: input.isPublished,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	};
	const { data, error } = await supabase.from("blog_posts").upsert(row).select().single();
	if (error) throw error;
	return data;
}
async function deleteBlogPost(id) {
	const { error } = await getSupabaseBrowser().from("blog_posts").delete().eq("id", id);
	if (error) throw error;
}
async function upsertTestimonial(input) {
	const supabase = getSupabaseBrowser();
	const row = {
		...input.id ? { id: input.id } : {},
		client_name: input.clientName.trim(),
		client_location: input.clientLocation.trim(),
		rating: Math.min(5, Math.max(1, input.rating)),
		review_text: input.reviewText.trim(),
		review_date: input.reviewDate,
		is_published: input.isPublished
	};
	const { data, error } = await supabase.from("testimonials").upsert(row).select().single();
	if (error) throw error;
	return data;
}
async function deleteTestimonial(id) {
	const { error } = await getSupabaseBrowser().from("testimonials").delete().eq("id", id);
	if (error) throw error;
}
async function upsertFaq(input) {
	const supabase = getSupabaseBrowser();
	const row = {
		id: input.id ?? `faq-${slugFromTitle(input.question)}`,
		question: input.question.trim(),
		answer: input.answer.trim(),
		category: input.category.trim() || "General",
		display_order: input.displayOrder,
		is_published: input.isPublished
	};
	const { data, error } = await supabase.from("faqs").upsert(row).select().single();
	if (error) throw error;
	return data;
}
async function deleteFaq(id) {
	const { error } = await getSupabaseBrowser().from("faqs").delete().eq("id", id);
	if (error) throw error;
}
async function upsertPartner(input) {
	const supabase = getSupabaseBrowser();
	const row = {
		...input.id ? { id: input.id } : {},
		name: input.name.trim(),
		slug: input.slug.trim() || slugFromTitle(input.name),
		logo_url: input.logoUrl.trim(),
		website_url: input.websiteUrl.trim(),
		description: input.description.trim(),
		display_order: input.displayOrder,
		is_published: input.isPublished
	};
	const { data, error } = await supabase.from("partners").upsert(row).select().single();
	if (error) throw error;
	return data;
}
async function deletePartner(id) {
	const { error } = await getSupabaseBrowser().from("partners").delete().eq("id", id);
	if (error) throw error;
}
/** Partner logo upload -> media bucket, returns public URL (single size). */
async function uploadPartnerLogo(file) {
	const bitmap = await createImageBitmap(file);
	const scale = Math.min(1, 1600 / bitmap.width);
	const canvas = new OffscreenCanvas(Math.round(bitmap.width * scale), Math.round(bitmap.height * scale));
	canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
	const blob = await canvas.convertToBlob({
		type: "image/webp",
		quality: .9
	});
	bitmap.close();
	const base = `partner-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
	const { error } = await getSupabaseBrowser().storage.from("media").upload(`full/${base}.webp`, blob, { contentType: "image/webp" });
	if (error) throw error;
	return publicUrl(`full/${base}.webp`);
}
async function saveSettings(entries) {
	const supabase = getSupabaseBrowser();
	const rows = Object.entries(entries).map(([key, value]) => ({
		key,
		value
	}));
	const { error } = await supabase.from("site_settings").upsert(rows, { onConflict: "key" });
	if (error) throw error;
}
//#endregion
export { upsertTestimonial as C, upsertPartner as S, uploadPartnerLogo as _, deleteImageRow as a, upsertBlogPost as b, deleteReel as c, parsePriceInput as d, reorderImages as f, updateProperty as g, slugFromTitle as h, deleteFaq as i, deleteTestimonial as l, saveSettings as m, createProperty as n, deletePartner as o, saveReel as p, deleteBlogPost as r, deleteProperty as s, addImageRow as t, parseInstagramUrl as u, uploadPropertyImage as v, upsertFaq as x, uploadReelCover as y };
