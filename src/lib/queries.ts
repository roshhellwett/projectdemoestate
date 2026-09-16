/**
 * Site content queries. Each loader calls one of these with the server
 * supabase client; all of them respect RLS and published flags.
 */

import type { SupabaseClient } from "@supabase/supabase-js";
import type { BlogPost, Faq, Partner, Property, PropertyImage, Reel, SiteSettings } from "./types";

export interface PropertyQuery {
  q?: string;
  locality?: string;
  bhk?: string; // "2" | "3" | "4" | "commercial"
  minPrice?: number;
  maxPrice?: number;
  possession?: string;
  furnishing?: string;
  sort?: string; // "price_asc" | "price_desc" | "area_desc" | "newest" | "featured"
  featuredOnly?: boolean;
  limit?: number;
}

type QueryBuilder = ReturnType<ReturnType<SupabaseClient["from"]>["select"]>;

/** Applies text search + facet filters to a properties query builder. */
function applyFilters(query: QueryBuilder, f: PropertyQuery) {
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

export async function listProperties(client: SupabaseClient, f: PropertyQuery = {}): Promise<Property[]> {
  const builder = client.from("properties").select("*");
  let q = applyFilters(builder, f);

  if (f.sort === "price_asc") {
    q = q.order("price_inr", { ascending: true, nullsFirst: false });
  } else if (f.sort === "price_desc") {
    q = q.order("price_inr", { ascending: false, nullsFirst: false });
  } else if (f.sort === "area_desc") {
    q = q.order("area_sqft", { ascending: false, nullsFirst: false });
  } else if (f.sort === "newest") {
    q = q.order("created_at", { ascending: false });
  } else {
    // Default: featured first, then newest
    q = q.order("is_featured", { ascending: false }).order("created_at", { ascending: false });
  }

  if (f.limit) q = q.limit(f.limit);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as Property[];
}

export async function getPropertyBySlug(client: SupabaseClient, slug: string): Promise<Property | null> {
  const { data, error } = await client
    .from("properties")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  if (error) throw error;
  return (data as Property) ?? null;
}

export async function getImagesForProperty(client: SupabaseClient, propertyId: string): Promise<PropertyImage[]> {
  const { data, error } = await client
    .from("property_images")
    .select("*")
    .eq("property_id", propertyId)
    .order("sort_order");
  if (error) throw error;
  return (data ?? []) as PropertyImage[];
}

/** Similar listings: same locality first, then same bhk, excluding self. */
export async function getSimilarProperties(
  client: SupabaseClient,
  property: Property,
  limit = 3,
): Promise<Property[]> {
  const { data, error } = await client
    .from("properties")
    .select("*")
    .eq("is_published", true)
    .neq("id", property.id)
    .or(`locality.eq.${property.locality},bhk_type.eq.${property.bhk_type}`)
    .limit(limit * 2);
  if (error) throw error;
  const rows = (data ?? []) as Property[];
  const scored = rows
    .map((r) => {
      let score = 0;
      if (r.locality === property.locality) score += 3;
      if (r.bhk_type === property.bhk_type) score += 2;
      if (Math.abs((r.price_inr ?? 0) - (property.price_inr ?? 0)) < 2e6) score += 1;
      return { r, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
  return scored.map((s) => s.r);
}

export async function listReels(client: SupabaseClient, onlyPublished = true): Promise<Reel[]> {
  let q = client.from("reels").select("*");
  if (onlyPublished) q = q.eq("is_published", true);
  const { data, error } = await q.order("display_order");
  if (error) throw error;
  return (data ?? []) as Reel[];
}

export const DEFAULT_PARTNERS: Partner[] = [
  {
    id: "p-auricas",
    name: "Auricas",
    slug: "auricas",
    logo_url: "/images/partners/auricas.webp",
    website_url: "https://auricas.com",
    description: "Crafting Golden Spaces - Premium residential developments across Kolkata",
    display_order: 10,
    is_published: true,
    created_at: "2025-01-01T00:00:00Z",
  },
  {
    id: "p-credai",
    name: "CREDAI Kolkata",
    slug: "credai",
    logo_url: "/images/partners/credai.webp",
    website_url: "https://credaibengal.in",
    description: "Apex body for private real estate developers, setting ethical standards and construction excellence across Bengal.",
    display_order: 20,
    is_published: true,
    created_at: "2025-01-01T00:00:00Z",
  },
  {
    id: "p-dtc",
    name: "DTC Group",
    slug: "dtc",
    logo_url: "/images/partners/dtc.webp",
    website_url: "https://dtcgroup.in",
    description: "Commit. Deliver. Grow - Leading infrastructure and integrated township developers in Greater Kolkata.",
    display_order: 30,
    is_published: true,
    created_at: "2025-01-01T00:00:00Z",
  },
  {
    id: "p-eden",
    name: "Eden Group",
    slug: "eden",
    logo_url: "/images/partners/eden.webp",
    website_url: "https://edengroup.in",
    description: "Distinctive architectural homes across North & South Kolkata with proven legacy.",
    display_order: 40,
    is_published: true,
    created_at: "2025-01-01T00:00:00Z",
  },
  {
    id: "p-herohomes",
    name: "Hero Homes",
    slug: "herohomes",
    logo_url: "/images/partners/herohomes.webp",
    website_url: "https://herohomes.in",
    description: "Sustainable luxury communities and integrated high-rise wellness enclaves.",
    display_order: 50,
    is_published: true,
    created_at: "2025-01-01T00:00:00Z",
  },
  {
    id: "p-ruchirealty",
    name: "Ruchi Realty",
    slug: "ruchirealty",
    logo_url: "/images/partners/ruchirealty.webp",
    website_url: "https://ruchirealty.com",
    description: "Iconic commercial and residential landmarks with state-of-the-art community amenities.",
    display_order: 60,
    is_published: true,
    created_at: "2025-01-01T00:00:00Z",
  },
  {
    id: "p-silvervilla",
    name: "Silver Villa",
    slug: "silvervilla",
    logo_url: "/images/partners/silvervilla.webp",
    website_url: "",
    description: "Bespoke gated villas and premium boutique residences in peaceful green corridors.",
    display_order: 70,
    is_published: true,
    created_at: "2025-01-01T00:00:00Z",
  },
  {
    id: "p-synergy",
    name: "Synergy Group",
    slug: "synergy",
    logo_url: "/images/partners/synergy.webp",
    website_url: "",
    description: "Modern high-rise residential towers strategically connected to Kolkata’s key transit nodes.",
    display_order: 80,
    is_published: true,
    created_at: "2025-01-01T00:00:00Z",
  },
];

export async function listPartners(client: SupabaseClient, onlyPublished = true): Promise<Partner[]> {
  try {
    let q = client.from("partners").select("*");
    if (onlyPublished) q = q.eq("is_published", true);
    const { data, error } = await q.order("display_order");
    if (!error && data && data.length > 0) {
      return data as Partner[];
    }
  } catch (err) {
    console.warn("Could not query partners table from Supabase, using defaults:", err);
  }
  return DEFAULT_PARTNERS;
}

/** Site settings as a key->value map. Missing keys are simply absent. */
export async function getSiteSettings(client: SupabaseClient): Promise<SiteSettings> {
  const { data, error } = await client.from("site_settings").select("key, value");
  if (error) throw error;
  const map: SiteSettings = {};
  for (const row of (data ?? []) as { key: string; value: string }[]) {
    map[row.key] = row.value;
  }
  return map;
}

export async function listBlogPosts(client: SupabaseClient, limit?: number): Promise<BlogPost[]> {
  let q = client
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("publish_date", { ascending: false });
  if (limit) q = q.limit(limit);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as BlogPost[];
}

export async function getBlogPostBySlug(client: SupabaseClient, slug: string): Promise<BlogPost | null> {
  const { data, error } = await client
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  if (error) throw error;
  return (data as BlogPost) ?? null;
}

export async function listPublishedTestimonials(client: SupabaseClient) {
  const { data, error } = await client
    .from("testimonials")
    .select("*")
    .eq("is_published", true)
    .order("review_date", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function listFaqs(client: SupabaseClient): Promise<Faq[]> {
  const { data, error } = await client
    .from("faqs")
    .select("*")
    .eq("is_published", true)
    .order("display_order");
  if (error) throw error;
  return (data ?? []) as Faq[];
}

/** Distinct localities with counts, for filter chips. */
export async function listLocalities(client: SupabaseClient): Promise<{ locality: string; count: number }[]> {
  const { data, error } = await client
    .from("properties")
    .select("locality")
    .eq("is_published", true);
  if (error) throw error;
  const counts = new Map<string, number>();
  for (const row of data ?? []) {
    counts.set(row.locality, (counts.get(row.locality) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([locality, count]) => ({ locality, count }))
    .sort((a, b) => b.count - a.count);
}
