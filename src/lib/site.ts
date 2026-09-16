/**
 * Site-wide constants - business identity, contact, nav.
 * Defaults are the recovered values; admin can override most of them live
 * from Dashboard > Settings (stored in the site_settings table).
 */

export const SITE = {
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
  youtube: "https://youtube.com/@SSProperty",
} as const;

export const NAV_LINKS = [
  { label: "Properties", to: "/properties" },
  { label: "Partners", to: "/partners" },
  { label: "Compare", to: "/compare" },
  { label: "Sell", to: "/sell" },
  { label: "Calculator", to: "/calculator" },
  { label: "Journal", to: "/journal" },
  { label: "About", to: "/about" },
] as const;

export const FOOTER_SERVICES = [
  { label: "Buy a Property", to: "/properties" },
  { label: "Sell Your Property", to: "/sell" },
  { label: "Partner With Us", to: "/partners" },
] as const;

/**
 * Merge admin settings (site_settings table) over the defaults above.
 * Every key is optional - anything the admin has not written keeps the default.
 */
export function applySettings(
  settings: Record<string, string | undefined>,
): SiteInfo {
  const wa = settings.whatsapp_number
    ? `https://wa.me/${settings.whatsapp_number.replace(/\D/g, "")}`
    : SITE.whatsapp;
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
    footerNote: settings.footer_note ?? "Verified listings. Transparent pricing. No hidden charges.",
  };
}

export interface SiteInfo {
  name: string;
  tagline: string;
  phone: string;
  phoneHref: string;
  whatsapp: string;
  email: string;
  emailHref: string;
  city: string;
  instagram: string;
  instagramHandle: string;
  facebook: string;
  youtube: string;
  footerNote: string;
}
