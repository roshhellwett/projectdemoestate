/**
 * Database row types (mirrors supabase/migrations/0001_initial_schema.sql).
 */

export interface Property {
  id: string;
  slug: string;
  title: string;
  location: string;
  locality: string;
  price_inr: number | null;
  price_display: string | null;
  bhk_type: string;
  property_type: string;
  possession_status: string;
  furnishing_status: string;
  area_sqft: number | null;
  bathrooms: number | null;
  balconies: number | null;
  floor: string | null;
  facing: string | null;
  parking: string | null;
  amenities: string[];
  landmarks: string[];
  description: string;
  category: string | null;
  status: string;
  main_image: string;
  main_image_thumb: string;
  developer_name: string | null;
  instagram_url: string | null;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface PropertyImage {
  id: string;
  property_id: string;
  sort_order: number;
  caption: string;
  alt_text: string;
  image_url: string;
  thumb_url: string;
  created_at: string;
}

export interface Reel {
  id: string;
  title: string;
  reel_url: string;
  embed_url: string;
  cover_image: string;
  cover_thumb: string;
  display_order: number;
  is_published: boolean;
  created_at: string;
}

export interface Partner {
  id: string;
  name: string;
  slug: string;
  logo_url: string;
  website_url: string;
  description: string;
  display_order: number;
  is_published: boolean;
  created_at: string;
}

/** Key -> value map from the site_settings table. */
export type SiteSettings = Record<string, string>;

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  publish_date: string;
  author: string;
  cover_image: string;
  cover_thumb: string;
  content: string;
  excerpt: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_location: string;
  rating: number;
  review_text: string;
  review_date: string | null;
  client_photo: string;
  is_published: boolean;
  created_at: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category: string;
  display_order: number;
  is_published: boolean;
  created_at: string;
}

export type EnquiryKind = "contact" | "property" | "sell" | "partner";
export type EnquiryStatus = "new" | "contacted" | "closed" | "spam";

export interface Enquiry {
  id: string;
  kind: EnquiryKind;
  property_id: string | null;
  name: string;
  phone: string;
  email: string | null;
  message: string;
  payload: Record<string, unknown>;
  status: EnquiryStatus;
  created_at: string;
}
