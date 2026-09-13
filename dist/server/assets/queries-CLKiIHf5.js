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
//#region src/lib/site.ts
/**
* Site-wide constants - business identity, contact, nav.
* Defaults are the recovered values; admin can override most of them live
* from Dashboard > Settings (stored in the site_settings table).
*/
var SITE = {
	name: "SS Property",
	tagline: "Premium Real Estate in Kolkata",
	phone: "+91 94296 93786",
	phoneHref: "tel:+919429693786",
	whatsapp: "https://wa.me/919429693786",
	email: "writetous@ssproperty.in",
	emailHref: "mailto:writetous@ssproperty.in",
	city: "Kolkata, West Bengal",
	instagram: "https://instagram.com/sspropertykol",
	instagramHandle: "sspropertykol",
	facebook: "https://facebook.com/sspropertykol",
	youtube: "https://youtube.com/@SSProperty"
};
var NAV_LINKS = [
	{
		label: "Properties",
		to: "/properties"
	},
	{
		label: "Compare",
		to: "/compare"
	},
	{
		label: "Sell",
		to: "/sell"
	},
	{
		label: "Calculator",
		to: "/calculator"
	},
	{
		label: "Journal",
		to: "/journal"
	},
	{
		label: "About",
		to: "/about"
	}
];
var FOOTER_SERVICES = [
	{
		label: "Buy a Property",
		to: "/properties"
	},
	{
		label: "Sell Your Property",
		to: "/sell"
	},
	{
		label: "Partner With Us",
		to: "/partner"
	}
];
/**
* Merge admin settings (site_settings table) over the defaults above.
* Every key is optional - anything the admin has not written keeps the default.
*/
function applySettings(settings) {
	const wa = settings.whatsapp_number ? `https://wa.me/${settings.whatsapp_number.replace(/\D/g, "")}` : SITE.whatsapp;
	const phone = settings.phone ?? SITE.phone;
	return {
		name: settings.brand_name ?? SITE.name,
		tagline: settings.tagline ?? SITE.tagline,
		phone,
		phoneHref: `tel:${phone.replace(/[^\d+]/g, "")}`,
		whatsapp: wa,
		email: settings.email ?? SITE.email,
		emailHref: `mailto:${settings.email ?? SITE.email}`,
		city: settings.city ?? SITE.city,
		instagram: settings.instagram_url ?? SITE.instagram,
		instagramHandle: settings.instagram_handle ?? SITE.instagramHandle,
		facebook: settings.facebook_url ?? SITE.facebook,
		youtube: settings.youtube_url ?? SITE.youtube,
		footerNote: settings.footer_note ?? "Verified listings. Transparent pricing. No hidden charges."
	};
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
	if (f.possession && f.possession !== "All") q = q.eq("possession_status", f.possession);
	if (f.furnishing && f.furnishing !== "All") q = q.ilike("furnishing_status", `%${f.furnishing}%`);
	if (f.featuredOnly) q = q.eq("is_featured", true);
	return q;
}
async function listProperties(client, f = {}) {
	let q = applyFilters(client.from("properties").select("*"), f);
	if (f.sort === "price_asc") q = q.order("price_inr", {
		ascending: true,
		nullsFirst: false
	});
	else if (f.sort === "price_desc") q = q.order("price_inr", {
		ascending: false,
		nullsFirst: false
	});
	else if (f.sort === "area_desc") q = q.order("area_sqft", {
		ascending: false,
		nullsFirst: false
	});
	else if (f.sort === "newest") q = q.order("created_at", { ascending: false });
	else q = q.order("is_featured", { ascending: false }).order("created_at", { ascending: false });
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
async function listReels(client, onlyPublished = true) {
	let q = client.from("reels").select("*");
	if (onlyPublished) q = q.eq("is_published", true);
	const { data, error } = await q.order("display_order");
	if (error) throw error;
	return data ?? [];
}
async function listPartners(client, onlyPublished = true) {
	let q = client.from("partners").select("*");
	if (onlyPublished) q = q.eq("is_published", true);
	const { data, error } = await q.order("display_order");
	if (error) throw error;
	return data ?? [];
}
/** Site settings as a key->value map. Missing keys are simply absent. */
async function getSiteSettings(client) {
	const { data, error } = await client.from("site_settings").select("key, value");
	if (error) throw error;
	const map = {};
	for (const row of data ?? []) map[row.key] = row.value;
	return map;
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
export { getSupabaseForRoute as _, getSiteSettings as a, listLocalities as c, listPublishedTestimonials as d, listReels as f, applySettings as g, SITE as h, getSimilarProperties as i, listPartners as l, NAV_LINKS as m, getImagesForProperty as n, listBlogPosts as o, FOOTER_SERVICES as p, getPropertyBySlug as r, listFaqs as s, getBlogPostBySlug as t, listProperties as u };
