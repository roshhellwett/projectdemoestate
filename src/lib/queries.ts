/**
 * Site content queries. Each loader calls one of these with the server
 * supabase client; all of them respect RLS and published flags.
 */

import type { SupabaseClient } from "@supabase/supabase-js";
import type { BlogPost, Faq, Property, PropertyImage, Reel } from "./types";

export interface PropertyQuery {
  q?: string;
  locality?: string;
  bhk?: string; // "2" | "3" | "4" | "commercial"
  minPrice?: number;
  maxPrice?: number;
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
  if (f.featuredOnly) q = q.eq("is_featured", true);
  return q;
}

export async function listProperties(client: SupabaseClient, f: PropertyQuery = {}): Promise<Property[]> {
  let q = applyFilters(
    client.from("properties").select("*").order("is_featured", { ascending: false }),
    f,
  );
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

export async function listReels(client: SupabaseClient): Promise<Reel[]> {
  const { data, error } = await client.from("reels").select("*").order("display_order");
  if (error) throw error;
  return (data ?? []) as Reel[];
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
