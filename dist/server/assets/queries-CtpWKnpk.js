import { t as getSupabaseBrowser } from "./supabase-C0JFk6-S.js";
//#region src/lib/route-supabase.ts
/**
* Supabase client for route loaders / server functions.
*
* Public content reads go through the publishable key - RLS permits reading
* published rows, so the same client works on the server (during SSR) and in
* the browser (during hydration and client navigation). No service key is
* ever shipped to the client bundle.
*/
function getSupabaseForRoute() {
	return getSupabaseBrowser();
}
//#endregion
//#region src/lib/queries.ts
/** Applies text search + facet filters to a properties query builder. */
function applyFilters(query, f) {
	let q = query.eq("is_published", true);
	if (f.q) {
		const like = `%${f.q.toLowerCase()}%`;
		q = q.or(`title.ilike.${like},location.ilike.${like},locality.ilike.${like},description.ilike.${like}`);
	}
	if (f.locality && f.locality !== "All") q = q.eq("locality", f.locality);
	if (f.bhk === "commercial") q = q.ilike("bhk_type", "Commercial%");
	else if (f.bhk) q = q.ilike("bhk_type", `${f.bhk}%`);
	if (f.minPrice != null) q = q.gte("price_inr", f.minPrice);
	if (f.maxPrice != null) q = q.lte("price_inr", f.maxPrice);
	if (f.featuredOnly) q = q.eq("is_featured", true);
	return q;
}
async function listProperties(client, f = {}) {
	let q = applyFilters(client.from("properties").select("*").order("is_featured", { ascending: false }), f);
	if (f.limit) q = q.limit(f.limit);
	const { data, error } = await q;
	if (error) throw error;
	return data ?? [];
}
async function getPropertyBySlug(client, slug) {
	const { data, error } = await client.from("properties").select("*").eq("slug", slug).eq("is_published", true).maybeSingle();
	if (error) throw error;
	return data ?? null;
}
async function getImagesForProperty(client, propertyId) {
	const { data, error } = await client.from("property_images").select("*").eq("property_id", propertyId).order("sort_order");
	if (error) throw error;
	return data ?? [];
}
/** Similar listings: same locality first, then same bhk, excluding self. */
async function getSimilarProperties(client, property, limit = 3) {
	const { data, error } = await client.from("properties").select("*").eq("is_published", true).neq("id", property.id).or(`locality.eq.${property.locality},bhk_type.eq.${property.bhk_type}`).limit(limit * 2);
	if (error) throw error;
	return (data ?? []).map((r) => {
		let score = 0;
		if (r.locality === property.locality) score += 3;
		if (r.bhk_type === property.bhk_type) score += 2;
		if (Math.abs((r.price_inr ?? 0) - (property.price_inr ?? 0)) < 2e6) score += 1;
		return {
			r,
			score
		};
	}).sort((a, b) => b.score - a.score).slice(0, limit).map((s) => s.r);
}
async function listReels(client) {
	const { data, error } = await client.from("reels").select("*").order("display_order");
	if (error) throw error;
	return data ?? [];
}
async function listBlogPosts(client, limit) {
	let q = client.from("blog_posts").select("*").eq("is_published", true).order("publish_date", { ascending: false });
	if (limit) q = q.limit(limit);
	const { data, error } = await q;
	if (error) throw error;
	return data ?? [];
}
async function getBlogPostBySlug(client, slug) {
	const { data, error } = await client.from("blog_posts").select("*").eq("slug", slug).eq("is_published", true).maybeSingle();
	if (error) throw error;
	return data ?? null;
}
async function listPublishedTestimonials(client) {
	const { data, error } = await client.from("testimonials").select("*").eq("is_published", true).order("review_date", { ascending: false });
	if (error) throw error;
	return data ?? [];
}
async function listFaqs(client) {
	const { data, error } = await client.from("faqs").select("*").eq("is_published", true).order("display_order");
	if (error) throw error;
	return data ?? [];
}
/** Distinct localities with counts, for filter chips. */
async function listLocalities(client) {
	const { data, error } = await client.from("properties").select("locality").eq("is_published", true);
	if (error) throw error;
	const counts = /* @__PURE__ */ new Map();
	for (const row of data ?? []) counts.set(row.locality, (counts.get(row.locality) ?? 0) + 1);
	return [...counts.entries()].map(([locality, count]) => ({
		locality,
		count
	})).sort((a, b) => b.count - a.count);
}
//#endregion
export { listBlogPosts as a, listProperties as c, getSupabaseForRoute as d, getSimilarProperties as i, listPublishedTestimonials as l, getImagesForProperty as n, listFaqs as o, getPropertyBySlug as r, listLocalities as s, getBlogPostBySlug as t, listReels as u };
