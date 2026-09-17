import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { FooterSettingsContext } from "../components/footer-settings";
import { FloatingConcierge } from "../components/floating-concierge";
import { FounderSection } from "../components/founder-section";
import { initRevealOnScroll } from "../lib/reveal";
import { getSupabaseForRoute } from "../lib/route-supabase";
import { getSiteSettings, listProperties } from "../lib/queries";

export const Route = createFileRoute("/about")({
  loader: async () => {
    const supabase = getSupabaseForRoute();
    const [properties, settings] = await Promise.all([
      listProperties(supabase, {}),
      getSiteSettings(supabase),
    ]);
    return { count: properties.length, settings };
  },
  head: () => ({
    meta: [
      { title: "About Ujjawal Sharma & SS Property · Built Around Trust" },
      {
        name: "description",
        content:
          "Founded by Ujjawal Sharma, SS Property is a premier Kolkata real estate advisory and media platform dedicated to physically verified listings, video tours, and transparent advisory.",
      },
      { property: "og:title", content: "About SS Property Kolkata · Built Around Trust" },
      {
        property: "og:description",
        content:
          "Founded by Ujjawal Sharma, SS Property is a premier Kolkata real estate advisory and media platform dedicated to physically verified listings, video tours, and transparent advisory.",
      },
      { property: "og:image", content: "/images/og-banner.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "About SS Property Kolkata · Built Around Trust" },
      { name: "twitter:image", content: "/images/og-banner.jpg" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { count, settings } = Route.useLoaderData();

  useEffect(() => {
    initRevealOnScroll();
  }, []);

  const stats = [
    {
      value: settings.about_stat_1_value ?? `${count}+`,
      label: settings.about_stat_1_label ?? "Live verified listings",
      note: settings.about_stat_1_note ?? "Across 10 Kolkata prime corridors.",
    },
    {
      value: settings.about_stat_2_value ?? "100%",
      label: settings.about_stat_2_label ?? "Papers checked",
      note: settings.about_stat_2_note ?? "Title, dues and approvals verified before listing.",
    },
    {
      value: settings.about_stat_3_value ?? "1:1",
      label: settings.about_stat_3_label ?? "Dedicated advisor",
      note: settings.about_stat_3_note ?? "Founder-led personal assistance from search to registry.",
    },
  ];

  const waLink = settings.whatsapp_number
    ? `https://wa.me/${settings.whatsapp_number.replace(/\D/g, "")}`
    : undefined;

  return (
    <div className="min-h-dvh bg-paper text-ink">
      <Header />
      <FloatingConcierge />
      <main className="pt-14 lg:pt-16">
        {/* =================================================================
            1. HERO PAGE BANNER
           ================================================================= */}
        <section className="border-b border-line bg-paper-2/60">
          <div className="shell py-14 md:py-20">
            <p className="eyebrow text-brass">About SS Property</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-tight tracking-tight text-ink md:text-5xl">
              We walk through every home before we list it.
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
              {settings.about_intro ??
                "SS Property is a Kolkata-based real estate advisory. We verify every listing in person - structure, papers, neighbourhood - so buyers see only what is real, and sellers deal only with serious people."}
            </p>
          </div>
        </section>

        {/* =================================================================
            2. FEATURED FOUNDER & OWNER SPOTLIGHT ("BUILT AROUND TRUST")
           ================================================================= */}
        <div className="border-b border-line bg-white/70 py-14 sm:py-20 md:py-24">
          <FounderSection
            phone={settings.phone}
            instagram={settings.instagram_url}
            whatsapp={waLink}
          />
        </div>

        {/* =================================================================
            3. KEY VERIFICATION STATS
           ================================================================= */}
        <section className="shell-wide grid gap-6 sm:gap-8 py-14 sm:py-16 md:grid-cols-3 border-b border-line reveal-stagger">
          {stats.map((s) => (
            <div key={s.label} className="card-sheen rounded-2xl border border-brass/40 bg-white p-6 sm:p-8 shadow-xs hover:border-brass hover:shadow-lg hover:shadow-brass/10 hover:-translate-y-1 transition-all duration-300">
              <p className="stat-value font-display text-4xl sm:text-5xl font-bold text-ink">{s.value}</p>
              <p className="mt-3 text-sm font-bold text-ink">{s.label}</p>
              <p className="mt-1 text-xs sm:text-sm text-muted leading-relaxed">{s.note}</p>
            </div>
          ))}
        </section>

        <section className="shell-wide pb-24 pt-12">
          <div className="grid gap-6 md:grid-cols-2 reveal-stagger">
            <div className="card-sheen rounded-[var(--radius-card)] border border-brass/40 bg-white p-8 shadow-xs hover:border-brass hover:shadow-md transition-all">
              <h2 className="font-display text-2xl font-medium text-ink">What we do</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                <li>Curated resale and new flats across Lake Town, Newtown, Kasba, Rajarhat and more.</li>
                <li>Full-stack selling support: valuation, photography, listing, buyer screening.</li>
                <li>Honest pricing guidance based on real closed deals, not asking prices.</li>
              </ul>
            </div>
            <div className="card-sheen rounded-[var(--radius-card)] border border-brass/40 bg-white p-8 shadow-xs hover:border-brass hover:shadow-md transition-all">
              <h2 className="font-display text-2xl font-medium text-ink">Talk to us</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Buying, selling or just figuring out the market - the conversation is free.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={settings.phone ? `tel:${settings.phone.replace(/[^\d+]/g, "")}` : "tel:+919429693786"}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper shadow-sm transition-transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  {settings.phone ?? "+91 94296 93786"}
                </a>
                <Link
                  to="/properties"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-brass/40 bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-brass hover:shadow-xs cursor-pointer"
                >
                  Browse Properties
                </Link>
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
