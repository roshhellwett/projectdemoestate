/**
 * Site content queries. Each loader calls one of these with the server
 * supabase client; all of them respect RLS and published flags.
 * Includes a zero-downtime offline fallback dataset with an active circuit breaker.
 */

import type { SupabaseClient } from "@supabase/supabase-js";
import type { BlogPost, Faq, Partner, Property, PropertyImage, Reel, SiteSettings, Testimonial } from "./types";
import {
  FALLBACK_PROPERTIES,
  FALLBACK_PROPERTY_IMAGES,
  FALLBACK_BLOG_POSTS,
  FALLBACK_FAQS,
  FALLBACK_REELS,
  FALLBACK_TESTIMONIALS,
  FALLBACK_SITE_SETTINGS,
} from "./fallback-data";

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

// Circuit breaker state to avoid repetitive DNS/timeout delays when Supabase is down
let consecutiveFailures = 0;
let nextCircuitCheckTime = 0;
const MAX_FAILURES_BEFORE_OPEN = 3;
const CIRCUIT_COOLDOWN_MS = 10_000; // 10s cooldown

function isSupabaseAvailable(): boolean {
  if (consecutiveFailures < MAX_FAILURES_BEFORE_OPEN) return true;
  if (Date.now() >= nextCircuitCheckTime) {
    return true; // Allow single probe request
  }
  return false;
}

function recordSupabaseSuccess() {
  consecutiveFailures = 0;
}

function recordSupabaseFailure(err: unknown) {
  consecutiveFailures++;
  if (consecutiveFailures >= MAX_FAILURES_BEFORE_OPEN) {
    nextCircuitCheckTime = Date.now() + CIRCUIT_COOLDOWN_MS;
    console.warn(
      `Supabase unreachable after ${consecutiveFailures} failures, circuit open for 10s:`,
      err instanceof Error ? err.message : err
    );
  }
}

async function withTimeout<T>(promise: PromiseLike<T>, timeoutMs = 6000): Promise<T> {
  return Promise.race([
    Promise.resolve(promise),
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("Supabase query timeout")), timeoutMs)
    ),
  ]);
}

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
  if (isSupabaseAvailable()) {
    try {
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
        q = q.order("is_featured", { ascending: false }).order("created_at", { ascending: false });
      }

      if (f.limit) q = q.limit(f.limit);
      const { data, error } = await withTimeout(q);
      if (!error && data) {
        recordSupabaseSuccess();
        return data as Property[];
      }
      if (error) recordSupabaseFailure(error);
    } catch (err) {
      recordSupabaseFailure(err);
    }
  }

  // Resilient in-memory fallback
  let list = FALLBACK_PROPERTIES.filter((p) => p.is_published);
  if (f.featuredOnly) list = list.filter((p) => p.is_featured);
  if (f.locality && f.locality !== "All") list = list.filter((p) => p.locality === f.locality);
  if (f.bhk === "commercial") list = list.filter((p) => p.bhk_type.toLowerCase().includes("commercial"));
  else if (f.bhk) list = list.filter((p) => p.bhk_type.toLowerCase().startsWith(f.bhk!.toLowerCase()));
  if (f.minPrice != null) list = list.filter((p) => (p.price_inr ?? 0) >= f.minPrice!);
  if (f.maxPrice != null) list = list.filter((p) => (p.price_inr ?? 0) <= f.maxPrice!);
  if (f.possession && f.possession !== "All") list = list.filter((p) => p.possession_status === f.possession);
  if (f.furnishing && f.furnishing !== "All") {
    list = list.filter((p) => p.furnishing_status.toLowerCase().includes(f.furnishing!.toLowerCase()));
  }
  if (f.q) {
    const term = f.q.toLowerCase();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.location.toLowerCase().includes(term) ||
        p.locality.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
    );
  }

  if (f.sort === "price_asc") {
    list.sort((a, b) => (a.price_inr ?? 0) - (b.price_inr ?? 0));
  } else if (f.sort === "price_desc") {
    list.sort((a, b) => (b.price_inr ?? 0) - (a.price_inr ?? 0));
  } else if (f.sort === "area_desc") {
    list.sort((a, b) => (b.area_sqft ?? 0) - (a.area_sqft ?? 0));
  } else if (f.sort === "newest") {
    list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  } else {
    list.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
  }

  if (f.limit) list = list.slice(0, f.limit);
  return list;
}

export async function getPropertyBySlug(client: SupabaseClient, slug: string): Promise<Property | null> {
  if (isSupabaseAvailable()) {
    try {
      const { data, error } = await withTimeout(
        client.from("properties").select("*").eq("slug", slug).eq("is_published", true).maybeSingle()
      );
      if (!error && data) {
        recordSupabaseSuccess();
        return data as Property;
      }
      if (error) recordSupabaseFailure(error);
    } catch (err) {
      recordSupabaseFailure(err);
    }
  }
  return FALLBACK_PROPERTIES.find((p) => p.slug === slug && p.is_published) ?? null;
}

export async function getImagesForProperty(client: SupabaseClient, propertyId: string): Promise<PropertyImage[]> {
  if (isSupabaseAvailable()) {
    try {
      const { data, error } = await withTimeout(
        client.from("property_images").select("*").eq("property_id", propertyId).order("sort_order")
      );
      if (!error && data) {
        recordSupabaseSuccess();
        return data as PropertyImage[];
      }
      if (error) recordSupabaseFailure(error);
    } catch (err) {
      recordSupabaseFailure(err);
    }
  }

  const matching = FALLBACK_PROPERTY_IMAGES.filter((i) => i.property_id === propertyId);
  return matching;
}

/** Similar listings: same locality first, then same bhk, excluding self. */
export async function getSimilarProperties(
  client: SupabaseClient,
  property: Property,
  limit = 3,
): Promise<Property[]> {
  if (isSupabaseAvailable()) {
    try {
      const { data, error } = await withTimeout(
        client
          .from("properties")
          .select("*")
          .eq("is_published", true)
          .neq("id", property.id)
          .or(`locality.eq.${property.locality},bhk_type.eq.${property.bhk_type}`)
          .limit(limit * 2)
      );
      if (!error && data) {
        recordSupabaseSuccess();
        const rows = data as Property[];
        return rows
          .map((r) => {
            let score = 0;
            if (r.locality === property.locality) score += 3;
            if (r.bhk_type === property.bhk_type) score += 2;
            if (Math.abs((r.price_inr ?? 0) - (property.price_inr ?? 0)) < 2e6) score += 1;
            return { r, score };
          })
          .sort((a, b) => b.score - a.score)
          .slice(0, limit)
          .map((s) => s.r);
      }
      if (error) recordSupabaseFailure(error);
    } catch (err) {
      recordSupabaseFailure(err);
    }
  }

  return FALLBACK_PROPERTIES
    .filter((p) => p.id !== property.id && p.is_published)
    .map((r) => {
      let score = 0;
      if (r.locality === property.locality) score += 3;
      if (r.bhk_type === property.bhk_type) score += 2;
      if (Math.abs((r.price_inr ?? 0) - (property.price_inr ?? 0)) < 2e6) score += 1;
      return { r, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.r);
}

export async function listReels(client: SupabaseClient, onlyPublished = true): Promise<Reel[]> {
  if (isSupabaseAvailable()) {
    try {
      let q = client.from("reels").select("*");
      if (onlyPublished) q = q.eq("is_published", true);
      const { data, error } = await withTimeout(q.order("display_order"));
      if (!error && data) {
        recordSupabaseSuccess();
        return data as Reel[];
      }
      if (error) recordSupabaseFailure(error);
    } catch (err) {
      recordSupabaseFailure(err);
    }
  }
  return [];
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
    description: "Modern high-rise residential towers strategically connected to Kolkata's key transit nodes.",
    display_order: 80,
    is_published: true,
    created_at: "2025-01-01T00:00:00Z",
  },
];

export async function listPartners(client: SupabaseClient, onlyPublished = true): Promise<Partner[]> {
  if (isSupabaseAvailable()) {
    try {
      let q = client.from("partners").select("*");
      if (onlyPublished) q = q.eq("is_published", true);
      const { data, error } = await withTimeout(q.order("display_order"));
      if (!error && data) {
        recordSupabaseSuccess();
        return data as Partner[];
      }
      if (error) recordSupabaseFailure(error);
    } catch (err) {
      recordSupabaseFailure(err);
    }
  }
  return DEFAULT_PARTNERS;
}

/** Site settings as a key->value map. Missing keys are filled from defaults. */
export async function getSiteSettings(client: SupabaseClient): Promise<SiteSettings> {
  const map: SiteSettings = { ...FALLBACK_SITE_SETTINGS };
  if (isSupabaseAvailable()) {
    try {
      const { data, error } = await withTimeout(client.from("site_settings").select("key, value"));
      if (!error && data) {
        recordSupabaseSuccess();
        for (const row of (data as { key: string; value: string }[])) {
          map[row.key] = row.value;
        }
      }
      if (error) recordSupabaseFailure(error);
    } catch (err) {
      recordSupabaseFailure(err);
    }
  }
  return map;
}

export async function listBlogPosts(client: SupabaseClient, limit?: number): Promise<BlogPost[]> {
  if (isSupabaseAvailable()) {
    try {
      let q = client
        .from("blog_posts")
        .select("*")
        .eq("is_published", true)
        .order("publish_date", { ascending: false });
      if (limit) q = q.limit(limit);
      const { data, error } = await withTimeout(q);
      if (!error && data) {
        recordSupabaseSuccess();
        return data as BlogPost[];
      }
      if (error) recordSupabaseFailure(error);
    } catch (err) {
      recordSupabaseFailure(err);
    }
  }

  const posts = FALLBACK_BLOG_POSTS.filter((p) => p.is_published);
  return limit ? posts.slice(0, limit) : posts;
}

export async function getBlogPostBySlug(client: SupabaseClient, rawSlug: string): Promise<BlogPost | null> {
  const cleanSlug = decodeURIComponent(rawSlug || "").trim();
  if (!cleanSlug) return null;

  if (isSupabaseAvailable()) {
    try {
      // 1. Exact match on slug
      const { data, error } = await withTimeout(
        client.from("blog_posts").select("*").eq("slug", cleanSlug).eq("is_published", true).maybeSingle()
      );
      if (!error && data) {
        recordSupabaseSuccess();
        return data as BlogPost;
      }

      // 2. Case-insensitive match on slug
      const { data: dataIlike } = await withTimeout(
        client.from("blog_posts").select("*").ilike("slug", cleanSlug).eq("is_published", true).maybeSingle()
      );
      if (dataIlike) {
        recordSupabaseSuccess();
        return dataIlike as BlogPost;
      }
      if (!error && !data) {
        return null;
      }
      if (error) recordSupabaseFailure(error);
    } catch (err) {
      recordSupabaseFailure(err);
    }
  }

  // Fallback checks
  let post = FALLBACK_BLOG_POSTS.find((p) => p.slug === cleanSlug && p.is_published);
  if (post) return post;

  post = FALLBACK_BLOG_POSTS.find((p) => p.slug.toLowerCase() === cleanSlug.toLowerCase() && p.is_published);
  if (post) return post;

  const normalized = cleanSlug.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  post = FALLBACK_BLOG_POSTS.find((p) => p.slug === normalized && p.is_published);
  if (post) return post;

  post = FALLBACK_BLOG_POSTS.find((p) => p.title.toLowerCase().includes(cleanSlug.toLowerCase()) && p.is_published);
  return post ?? null;
}

export async function listPublishedTestimonials(client: SupabaseClient): Promise<Testimonial[]> {
  if (isSupabaseAvailable()) {
    try {
      const { data, error } = await withTimeout(
        client.from("testimonials").select("*").eq("is_published", true).order("review_date", { ascending: false })
      );
      if (!error && data) {
        recordSupabaseSuccess();
        return data as Testimonial[];
      }
      if (error) recordSupabaseFailure(error);
    } catch (err) {
      recordSupabaseFailure(err);
    }
  }
  return FALLBACK_TESTIMONIALS.filter((t) => t.is_published);
}

export async function listFaqs(client: SupabaseClient): Promise<Faq[]> {
  if (isSupabaseAvailable()) {
    try {
      const { data, error } = await withTimeout(
        client.from("faqs").select("*").eq("is_published", true).order("display_order")
      );
      if (!error && data) {
        recordSupabaseSuccess();
        return data as Faq[];
      }
      if (error) recordSupabaseFailure(error);
    } catch (err) {
      recordSupabaseFailure(err);
    }
  }
  return FALLBACK_FAQS.filter((f) => f.is_published);
}

/** Distinct localities with counts, for filter chips. */
export async function listLocalities(client: SupabaseClient): Promise<{ locality: string; count: number }[]> {
  if (isSupabaseAvailable()) {
    try {
      const { data, error } = await withTimeout(
        client.from("properties").select("locality").eq("is_published", true)
      );
      if (!error && data) {
        recordSupabaseSuccess();
        const counts = new Map<string, number>();
        for (const row of (data as { locality: string }[])) {
          if (row.locality) {
            counts.set(row.locality, (counts.get(row.locality) ?? 0) + 1);
          }
        }
        return [...counts.entries()]
          .map(([locality, count]) => ({ locality, count }))
          .sort((a, b) => b.count - a.count);
      }
      if (error) recordSupabaseFailure(error);
    } catch (err) {
      recordSupabaseFailure(err);
    }
  }

  const counts = new Map<string, number>();
  for (const row of FALLBACK_PROPERTIES.filter((p) => p.is_published)) {
    counts.set(row.locality, (counts.get(row.locality) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([locality, count]) => ({ locality, count }))
    .sort((a, b) => b.count - a.count);
}
