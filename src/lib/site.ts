/**
 * Site-wide constants - business identity, contact, nav.
 * Source: the client's old live site footer (recovered 2026-09-10).
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
  facebook: "https://facebook.com/sspropertykol",
  youtube: "https://youtube.com/@SSProperty",
} as const;

export const NAV_LINKS = [
  { label: "Properties", to: "/properties" },
  { label: "Sell", to: "/sell" },
  { label: "Journal", to: "/journal" },
  { label: "About", to: "/about" },
] as const;

export const FOOTER_SERVICES = [
  { label: "Buy a Property", to: "/properties" },
  { label: "Sell Your Property", to: "/sell" },
  { label: "Partner With Us", to: "/partner" },
] as const;
