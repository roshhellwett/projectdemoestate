/**
 * Site-wide constants - business identity, contact, nav.
 * Defaults are configured for the Demo Real Estate Brand (Apex Living);
 * admin can override them live from Dashboard > Settings (stored in the site_settings table).
 *
 * When shipping to a new client, change SITE values here or update the
 * settings table to seamlessly rebrand the entire platform.
 */

export const SITE = {
  name: "Apex Living",
  tagline: "Premier Luxury Real Estate Advisory",
  phone: "+91 98000 00000",
  phoneHref: "tel:+919800000000",
  whatsapp: "https://wa.me/919800000000",
  email: "zenithprojects@icloud.com",
  emailHref: "mailto:zenithprojects@icloud.com",
  city: "Kolkata, West Bengal",
  instagram: "https://instagram.com",
  instagramHandle: "apexliving.demo",
  facebook: "https://facebook.com",
  youtube: "https://youtube.com",
  isDemo: true,
  founderName: "Aarav Mehta",
  founderTitle: "Founder & Principal Advisor",
  founderQuote: "Excellence in Every Square Foot.",
} as const;

export const NAV_LINKS = [
  { label: "Properties", to: "/properties" },
  { label: "Partners", to: "/partners" },
  { label: "Compare", to: "/compare" },
  { label: "Sell", to: "/sell" },
  { label: "Calculator", to: "/calculator" },
  { label: "Journal", to: "/journal" },
  { label: "About", to: "/about" },
  { label: "Instagram", to: "/instagram" },
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
    founderName: settings.founder_name ?? SITE.founderName,
    founderTitle: settings.founder_title ?? SITE.founderTitle,
    founderQuote: settings.founder_quote ?? SITE.founderQuote,
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
  founderName: string;
  founderTitle: string;
  founderQuote: string;
}
