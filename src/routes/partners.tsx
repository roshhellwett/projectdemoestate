import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { FooterSettingsContext } from "../components/footer-settings";
import { FloatingConcierge } from "../components/floating-concierge";
import { SellForm } from "../components/sell-form";
import { initRevealOnScroll } from "../lib/reveal";
import { getSupabaseForRoute } from "../lib/route-supabase";
import { getSiteSettings, listPartners } from "../lib/queries";
import { SITE } from "../lib/site";
import type { Partner } from "../lib/types";
import {
  ArrowSquareOut,
  Buildings,
  CheckCircle,
  Handshake,
  ShieldCheck,
  WhatsappLogo,
  Phone,
} from "@phosphor-icons/react";

export const Route = createFileRoute("/partners")({
  loader: async () => {
    const supabase = getSupabaseForRoute();
    const [partners, settings] = await Promise.all([
      listPartners(supabase),
      getSiteSettings(supabase),
    ]);
    return { partners, settings };
  },
  head: () => ({
    meta: [
      { title: "Builders & Brand Partners · Apex Living" },
      {
        name: "description",
        content:
          "Discover trusted developers, CREDAI certified builders, and institutional partners working with our advisory platform.",
      },
      { property: "og:title", content: "Builders & Brand Partners · Apex Living" },
      {
        property: "og:description",
        content:
          "Discover trusted developers, CREDAI certified builders, and institutional partners working with our advisory platform.",
      },
      { property: "og:image", content: "/images/properties/luxury_penthouse_terrace_1790945979055.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Builders & Brand Partners · Apex Living" },
      { name: "twitter:image", content: "/images/properties/luxury_penthouse_terrace_1790945979055.jpg" },
    ],
  }),
  component: PartnersPage,
});

const PARTNER_BENEFITS = [
  {
    icon: Buildings,
    title: "Real Estate Developers",
    body: "Showcase landmark residential towers, boutique projects, and commercial hubs to Kolkata's most qualified homebuyers and active NRI investors.",
  },
  {
    icon: ShieldCheck,
    title: "CREDAI & RERA Aligned",
    body: "Every project listed under our platform is backed by verified legal title checks, complete sanction approvals, and strict compliance standards.",
  },
  {
    icon: Handshake,
    title: "Institutional Collaboration",
    body: "From leading banking partners offering pre-approved mortgages to premier interior architects, our ecosystem covers the complete ownership journey.",
  },
];

function PartnersPage() {
  const { partners, settings } = Route.useLoaderData();

  useEffect(() => {
    initRevealOnScroll();
  }, []);

  return (
    <div className="min-h-dvh bg-paper">
      <Header />
      <FloatingConcierge />

      <main className="pt-20 sm:pt-24 lg:pt-28">
        {/* =================================================================
            HERO SECTION
           ================================================================= */}
        <section className="relative overflow-hidden border-b border-line bg-radial-vignette py-16 md:py-24">
          <div className="shell max-w-5xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-brass/40 bg-brass-ghost/40 px-4 py-1.5 text-xs font-semibold text-ink backdrop-blur-sm">
              <ShieldCheck size={16} weight="fill" className="text-verdigris" />
              <span>Verified Kolkata Developer Network</span>
            </div>

            <h1 className="mt-6 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl md:text-6xl">
              Builders and brands we work with
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              {settings.partner_intro ??
                "We collaborate with Kolkata's most reputable real estate developers, certified builders, and apex industry bodies like CREDAI to bring you verified, dispute-free residences."}
            </p>

            {/* Quick Metrics */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 md:gap-10 text-xs md:text-sm font-semibold text-ink">
              <div className="flex items-center gap-2">
                <CheckCircle size={18} weight="fill" className="text-verdigris" />
                <span>{partners.length} Premier Builder Partners</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={18} weight="fill" className="text-verdigris" />
                <span>100% Legal & Title Vetted</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={18} weight="fill" className="text-verdigris" />
                <span>0% Hidden Builder Markups</span>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            STATIC PARTNER LOGOS SHOWCASE (Clean, non-moving grid)
           ================================================================= */}
        <section className="shell-wide py-16 md:py-24">
          <div className="text-center">
            <p className="eyebrow">Direct Developer Inventory</p>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">
              Associated Builders & Institutional Bodies
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
              Official developer relationships giving you early-bird access, direct launch pricing, and priority unit selection.
            </p>
          </div>

          {/* Static Grid: Not moving / static logo presentation */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {partners.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} />
            ))}
          </div>
        </section>

        {/* =================================================================
            VALUE PILLARS FOR DEVELOPERS & PARTNERS
           ================================================================= */}
        <section className="border-y border-line bg-paper-2/60 py-16 md:py-24">
          <div className="shell-wide">
            <div className="max-w-2xl">
              <p className="eyebrow">Ecosystem & Standards</p>
              <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">
                Why top builders choose our platform
              </h2>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {PARTNER_BENEFITS.map((b) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.title}
                    className="rounded-2xl border border-line bg-white p-8 shadow-xs transition-shadow hover:shadow-md"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-paper-2 text-brass border border-line/80">
                      <Icon size={24} weight="regular" />
                    </div>
                    <h3 className="mt-6 font-display text-xl font-medium text-ink">{b.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{b.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =================================================================
            DEVELOPER CONTACT & ONBOARDING FORM
           ================================================================= */}
        <section className="shell max-w-4xl py-20 md:py-28">
          <div className="rounded-3xl border border-line bg-white p-8 md:p-14 shadow-sm">
            <div className="max-w-xl">
              <p className="eyebrow">Collaborate With Us</p>
              <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">
                List your project with our advisory
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Are you a real estate developer, landowner, or architectural brand looking to reach verified Kolkata buyers? Share your project details with our acquisitions desk.
              </p>
            </div>

            <div className="mt-10">
              <SellForm kind="partner" />
            </div>

            <div className="mt-10 pt-8 border-t border-line flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Direct Partnership Desk</p>
                <p className="font-display text-base font-medium text-ink mt-0.5">Advisory & Acquisitions Team</p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-verdigris px-5 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 shadow-xs"
                >
                  <WhatsappLogo size={16} weight="fill" />
                  <span>WhatsApp Desk</span>
                </a>
                <a
                  href={SITE.phoneHref}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-paper-2 px-5 py-2.5 text-xs font-semibold text-ink hover:bg-paper"
                >
                  <Phone size={15} className="text-brass" />
                  <span>{SITE.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterSettingsContext.Provider value={settings}>
        <Footer />
      </FooterSettingsContext.Provider>
    </div>
  );
}

/**
 * Static, non-moving partner card.
 * Displays logo static with crisp presentation, description, and link.
 */
function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-line bg-white p-6 md:p-7 shadow-xs transition-all duration-300 hover:border-brass/50 hover:shadow-lg hover:-translate-y-1 group">
      <div>
        {/* Fixed-height logo container with pure white background */}
        <div className="flex h-24 w-full items-center justify-center rounded-xl bg-paper-2/40 border border-line/40 p-4 transition-colors group-hover:bg-white">
          <img
            src={partner.logo_url}
            alt={partner.name}
            width={220}
            height={80}
            loading="lazy"
            decoding="async"
            className="max-h-16 w-auto max-w-[85%] object-contain filter transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Partner Name */}
        <h3 className="mt-5 font-display text-lg font-medium text-ink text-center">
          {partner.name}
        </h3>

        {/* Description */}
        {partner.description ? (
          <p className="mt-2 text-xs leading-relaxed text-muted text-center line-clamp-3">
            {partner.description}
          </p>
        ) : null}
      </div>

      {/* Website link if available */}
      <div className="mt-6 pt-4 border-t border-line/50 text-center">
        {partner.website_url ? (
          <a
            href={partner.website_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brass hover:text-ink transition-colors"
          >
            <span>Visit Official Site</span>
            <ArrowSquareOut size={13} />
          </a>
        ) : (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted">
            <CheckCircle size={13} className="text-verdigris" />
            <span>Verified Kolkata Partner</span>
          </span>
        )}
      </div>
    </div>
  );
}
