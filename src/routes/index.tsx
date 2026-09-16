import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { FooterSettingsContext } from "../components/footer-settings";
import { PropertyCard } from "../components/property-card";
import { FloatingConcierge } from "../components/floating-concierge";
import { HeroSearch } from "../components/hero-search";
import { NeighborhoodRadar } from "../components/neighborhood-radar";
import { QuickViewModal } from "../components/quick-view-modal";
import { CompareDrawer } from "../components/compare-drawer";
import { EmiCalculator } from "../components/emi-calculator";
import { ReelsSection, TestimonialStrip } from "../components/sections";
import { FounderSection } from "../components/founder-section";
import { initRevealOnScroll } from "../lib/reveal";
import { formatDate } from "../lib/format";
import { getSupabaseForRoute } from "../lib/route-supabase";
import { applySettings } from "../lib/site";
import {
  listBlogPosts,
  listFaqs,
  listProperties,
  listPublishedTestimonials,
  listReels,
  listLocalities,
  getSiteSettings,
} from "../lib/queries";
import type { Faq, Property } from "../lib/types";
import {
  ShieldCheck,
  Eye,
  Handshake,
  FileText,
  Sparkle,
  ArrowRight,
  CaretDown,
  SealCheck,
} from "@phosphor-icons/react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SS Property - Verified Luxury Residences & Commercial in Kolkata" },
      {
        name: "description",
        content:
          "Kolkata's premier real estate consultancy. Verified flats, penthouses and commercial spaces across Lake Town, Newtown, Kasba, Rajarhat and South Kolkata. 100% physically inspected.",
      },
      { property: "og:title", content: "SS Property - Verified Luxury Residences & Commercial in Kolkata" },
      {
        property: "og:description",
        content:
          "Kolkata's premier real estate consultancy. Verified flats, penthouses and commercial spaces across Lake Town, Newtown, Kasba, Rajarhat and South Kolkata. 100% physically inspected.",
      },
      { property: "og:image", content: "/images/og-banner.jpg" },
      { name: "twitter:title", content: "SS Property - Verified Luxury Residences & Commercial in Kolkata" },
      {
        name: "twitter:description",
        content:
          "Kolkata's premier real estate consultancy. Verified flats, penthouses and commercial spaces across Lake Town, Newtown, Kasba, Rajarhat and South Kolkata.",
      },
      { name: "twitter:image", content: "/images/og-banner.jpg" },
    ],
  }),
  loader: async () => {
    const supabase = getSupabaseForRoute();
    const [featured, latest, reels, posts, faqs, testimonials, settings, localities] =
      await Promise.all([
        listProperties(supabase, { featuredOnly: true, limit: 6 }),
        listProperties(supabase, { limit: 12 }),
        listReels(supabase),
        listBlogPosts(supabase, 3),
        listFaqs(supabase),
        listPublishedTestimonials(supabase),
        getSiteSettings(supabase),
        listLocalities(supabase),
      ]);

    const corridorCounts: Record<string, number> = {};
    for (const loc of localities ?? []) {
      corridorCounts[loc.locality] = loc.count;
    }

    return {
      featured,
      latest,
      reels,
      posts,
      faqs,
      testimonials,
      settings,
      corridorCounts,
      site: applySettings(settings),
    };
  },
  component: HomePage,
});

function HomePage() {
  const { featured, latest, reels, posts, faqs, testimonials, settings, corridorCounts, site } =
    Route.useLoaderData();

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [quickViewProperty, setQuickViewProperty] = useState<Property | null>(null);

  useEffect(() => {
    initRevealOnScroll();
  }, []);

  // Filter featured properties based on selected tab
  const displayedProperties = featured.filter((p) => {
    if (activeCategory === "ready") return p.possession_status === "Ready To Move";
    if (activeCategory === "luxury") return (p.price_inr ?? 0) >= 10000000;
    if (activeCategory === "commercial")
      return p.bhk_type.toLowerCase().includes("commercial");
    return true;
  });

  const totalPropertiesCount = useMemo(() => {
    const ids = new Set<string>();
    for (const p of featured) ids.add(p.id);
    for (const p of latest) ids.add(p.id);
    return ids.size;
  }, [featured, latest]);

  const heroTitle = settings.hero_title ?? "Kolkata's Most Coveted Addresses. Personally Verified.";
  const [line1, line2 = ""] = heroTitle.split(". ").length > 1
    ? [`${heroTitle.split(". ")[0]}.`, heroTitle.split(". ").slice(1).join(". ")]
    : [heroTitle, ""];

  return (
    <FooterSettingsContext.Provider value={settings}>
      <div className="min-h-dvh bg-paper text-ink selection:bg-brass-ghost selection:text-ink">
        <Header />

        <main>
          {/* =================================================================
              1. HERO SECTION — Mobile-first single-column → 2-col on lg
             ================================================================= */}
          <section className="relative overflow-hidden pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24 border-b border-line/60 hero-mesh">
            <div className="shell-wide">
              <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
                {/* Hero Left Column: Copy & Value Proposition */}
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-brass/35 bg-white/80 px-3.5 py-2 text-xs font-semibold text-ink shadow-xs">
                    <SealCheck size={16} weight="fill" className="text-verdigris shrink-0" />
                    <span>{settings.hero_eyebrow ?? "Kolkata's Premier Property Consultancy"}</span>
                  </div>

                  <h1 className="mt-5 font-display text-[clamp(1.75rem,5.5vw,4.25rem)] font-medium leading-[1.08] tracking-tight text-ink [text-wrap:balance]">
                    <span className="hero-line"><span>{line1}</span></span>
                    {line2 ? (
                      <span className="hero-line">
                        <span className="italic font-normal text-brass">{line2}</span>
                      </span>
                    ) : null}
                  </h1>

                  <p className="mt-4 sm:mt-5 max-w-xl text-sm sm:text-[15px] leading-relaxed text-muted">
                    {settings.hero_subtitle ??
                      "Hand-verified flats, penthouses and commercial spaces across Lake Town, Newtown, Kasba, Rajarhat, and Greater Kolkata. Every property personally inspected, every legal title verified."}
                  </p>

                  <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                    <Link
                      to="/properties"
                      className="flex items-center justify-center rounded-full bg-ink px-7 py-3.5 sm:px-8 sm:py-4 text-sm font-semibold text-paper shadow-lg shadow-ink/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-2 active:translate-y-0"
                    >
                      {featured.length + latest.length > 0 ? `Explore ${featured.length + latest.length} Residences` : "Explore Residences"}
                    </Link>
                    <a
                      href={site.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 rounded-full border border-line bg-white/90 px-6 py-3.5 sm:px-7 sm:py-4 text-sm font-semibold text-ink shadow-xs transition-all hover:border-brass hover:bg-white active:translate-y-0"
                    >
                      <span>Speak with an Advisor</span>
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>

                {/* Hero Right Column: Visual Showcase */}
                <div className="relative">
                  <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-line bg-paper-2 shadow-[0_32px_64px_-24px_rgba(18,16,14,0.18)]">
                    <img
                      src="/images/kolkata.webp"
                      alt="SS Property - Kolkata Skyline & Premier Residences"
                      width={1000}
                      height={750}
                      loading="eager"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>
              </div>

              {/* Instant Search Widget */}
              <div className="mt-8 sm:mt-12 md:mt-16">
                <HeroSearch totalCount={totalPropertiesCount} />
              </div>

              {/* Trust Stat Ticker — horizontal scroll on mobile */}
              <div className="mt-8 sm:mt-10 scroll-rail sm:grid sm:grid-cols-4 gap-4 sm:gap-6 border-t border-line/70 pt-6 sm:pt-8">
                <div className="shrink-0 min-w-[140px] sm:min-w-0">
                  <p className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-ink">₹150+ Cr</p>
                  <p className="mt-1 text-xs text-muted font-medium">Curated Property Value</p>
                </div>
                <div className="shrink-0 min-w-[140px] sm:min-w-0">
                  <p className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-ink">
                    {totalPropertiesCount > 0 ? `${totalPropertiesCount} Prime` : "Bespoke"}
                  </p>
                  <p className="mt-1 text-xs text-muted font-medium">Verified Kolkata Listings</p>
                </div>
                <div className="shrink-0 min-w-[140px] sm:min-w-0">
                  <p className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-ink">100%</p>
                  <p className="mt-1 text-xs text-muted font-medium">Physical Site Inspection</p>
                </div>
                <div className="shrink-0 min-w-[140px] sm:min-w-0">
                  <p className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-ink">0%</p>
                  <p className="mt-1 text-xs text-muted font-medium">Hidden Charges / Mislead</p>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================================
              2. DIRECT CLIENT SERVICES & OPERATIONS HUB
             ================================================================= */}
          <section className="border-b border-line bg-white/70 py-12 md:py-16">
            <div className="shell-wide">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <p className="eyebrow text-brass">Seamless Real Estate Services</p>
                  <h2 className="mt-1.5 font-display text-xl sm:text-2xl md:text-3xl font-medium text-ink">
                    How We Assist Your Kolkata Property Journey
                  </h2>
                </div>
                <p className="text-xs text-muted max-w-md">
                  From physically verified home tours to owner property onboarding and bank finance, our advisors manage the complete lifecycle.
                </p>
              </div>

              <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {/* Service 1: Buy Verified */}
                <Link
                  to="/properties"
                  className="group flex flex-col justify-between rounded-2xl border border-line bg-paper/60 p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brass/60 hover:bg-white hover:shadow-lg"
                >
                  <div>
                    <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-ink text-paper transition-transform duration-300 group-hover:scale-105">
                      <ShieldCheck size={22} weight="fill" className="text-brass-2" />
                    </div>
                    <h3 className="mt-4 font-display text-base sm:text-lg font-semibold text-ink">
                      Buy Verified Residences
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted">
                      100% physically inspected flats, penthouses and commercial spaces. Every legal deed and RERA permit verified before listing.
                    </p>
                  </div>
                  <div className="mt-5 sm:mt-6 flex items-center gap-1.5 text-xs font-bold text-ink group-hover:text-brass transition-colors">
                    <span>Browse Collection</span>
                    <ArrowRight size={14} />
                  </div>
                </Link>

                {/* Service 2: Sell / List */}
                <Link
                  to="/sell"
                  className="group flex flex-col justify-between rounded-2xl border border-line bg-paper/60 p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brass/60 hover:bg-white hover:shadow-lg"
                >
                  <div>
                    <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-ink text-paper transition-transform duration-300 group-hover:scale-105">
                      <Handshake size={22} weight="fill" className="text-brass-2" />
                    </div>
                    <h3 className="mt-4 font-display text-base sm:text-lg font-semibold text-ink">
                      List & Sell Your Property
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted">
                      Direct owner and builder listing service. Get genuine valuation, professional media coverage, and qualified buyers with zero spam.
                    </p>
                  </div>
                  <div className="mt-5 sm:mt-6 flex items-center gap-1.5 text-xs font-bold text-ink group-hover:text-brass transition-colors">
                    <span>List Your Property</span>
                    <ArrowRight size={14} />
                  </div>
                </Link>

                {/* Service 3: Finance & Advisor */}
                <Link
                  to="/calculator"
                  className="group flex flex-col justify-between rounded-2xl border border-line bg-paper/60 p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brass/60 hover:bg-white hover:shadow-lg sm:col-span-2 lg:col-span-1"
                >
                  <div>
                    <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-ink text-paper transition-transform duration-300 group-hover:scale-105">
                      <Eye size={22} weight="fill" className="text-brass-2" />
                    </div>
                    <h3 className="mt-4 font-display text-base sm:text-lg font-semibold text-ink">
                      Compare & Mortgage Planning
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted">
                      Side-by-side architectural specs comparison, West Bengal stamp duty calculations, and bank home loan advisory.
                    </p>
                  </div>
                  <div className="mt-5 sm:mt-6 flex items-center gap-1.5 text-xs font-bold text-ink group-hover:text-brass transition-colors">
                    <span>Calculate EMI & Returns</span>
                    <ArrowRight size={14} />
                  </div>
                </Link>
              </div>
            </div>
          </section>

          {/* =================================================================
              3.5. SPATIAL CORRIDOR RADAR & COMMUTE MATRIX
             ================================================================= */}
          <NeighborhoodRadar corridorCounts={corridorCounts} />

          {/* =================================================================
              4. FEATURED RESIDENCES CATALOG
             ================================================================= */}
          <section className="shell-wide py-14 sm:py-20 md:py-28 border-t border-line">
            <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow flex items-center gap-1.5 text-brass">
                  <Sparkle size={14} weight="fill" />
                  Curated Catalog
                </p>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl font-medium tracking-tight text-ink md:text-4xl">
                  Featured residences & workspaces
                </h2>
                <p className="mt-2 sm:mt-3 max-w-xl text-sm text-muted">
                  Hand-picked flats, penthouses and commercial spaces across Lake Town, Kasba, Newtown and Rajarhat.
                </p>
              </div>

              {/* Category Filter Pills — horizontal scroll on mobile */}
              <div className="scroll-rail gap-2">
                {[
                  { id: "all", label: "All Properties" },
                  { id: "ready", label: "Ready to Move" },
                  { id: "luxury", label: "Luxury (₹1 Cr+)" },
                  { id: "commercial", label: "Commercial" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-semibold transition-all cursor-pointer ${
                      activeCategory === cat.id
                        ? "bg-ink text-paper shadow-sm"
                        : "border border-line bg-white text-muted hover:border-brass hover:text-ink"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {displayedProperties.length > 0 ? (
              <>
                {/* Property Cards Grid — single col on mobile */}
                <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {displayedProperties.map((property, idx) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      priority={idx < 3}
                      onQuickView={setQuickViewProperty}
                    />
                  ))}
                </div>

                <div className="mt-8 sm:mt-12 text-center">
                  <Link
                    to="/properties"
                    className="inline-flex items-center gap-2 rounded-full border border-ink/30 bg-white px-7 py-3.5 text-sm font-semibold text-ink shadow-sm transition-all hover:border-ink hover:bg-paper-2"
                  >
                    <span>Browse All {totalPropertiesCount} Properties</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </>
            ) : (
              /* Luxury Onboarding Empty State */
              <div className="mt-8 sm:mt-12 flex flex-col items-center justify-center rounded-2xl sm:rounded-3xl border border-line bg-white p-8 sm:p-10 md:p-16 text-center shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brass-ghost text-brass">
                  <Sparkle size={28} weight="fill" />
                </div>
                <h3 className="mt-5 font-display text-xl sm:text-2xl font-medium text-ink">
                  Onboarding Verified Residences
                </h3>
                <p className="mt-2 max-w-lg text-xs sm:text-sm text-muted leading-relaxed">
                  The SS Property advisory desk is currently conducting on-ground walkthroughs and legal title verifications for upcoming Kolkata inventory. Are you an owner looking to list?
                </p>
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    to="/sell"
                    className="w-full sm:w-auto rounded-full bg-ink px-7 py-3 text-xs font-bold uppercase tracking-wider text-paper shadow-md hover:bg-ink-2 transition-all text-center"
                  >
                    List Your Property
                  </Link>
                  <a
                    href={site.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto rounded-full border border-line bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-ink hover:border-brass transition-all text-center"
                  >
                    Speak with Concierge
                  </a>
                </div>
              </div>
            )}
          </section>

          {/* =================================================================
              5. WHY CHOOSE SS PROPERTY (TRANSPARENCY MANIFESTO)
             ================================================================= */}
          <section className="border-y border-line bg-paper-2/70 py-14 sm:py-20 md:py-28">
            <div className="shell">
              <div className="text-center max-w-2xl mx-auto">
                <p className="eyebrow text-brass">The SS Property Standard</p>
                <h2 className="mt-3 font-display text-2xl sm:text-3xl font-medium tracking-tight text-ink md:text-4xl">
                  Real estate done with uncompromised integrity
                </h2>
                <p className="mt-3 sm:mt-4 text-sm text-muted leading-relaxed">
                  In a market crowded with stock photos, inflated claims, and phantom listings, SS Property is built on one simple rule: absolute ground reality.
                </p>
              </div>

              <div className="mt-10 sm:mt-16 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-line bg-white p-5 sm:p-6 shadow-sm">
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-brass-ghost text-brass">
                    <Eye size={22} weight="duotone" />
                  </div>
                  <h3 className="mt-4 sm:mt-5 font-display text-base sm:text-lg font-semibold text-ink">
                    100% Physical Walkthroughs
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted">
                    No renders or stock photography. Every single home in our catalog has been physically stepped into, measured, and photographed.
                  </p>
                </div>

                <div className="rounded-2xl border border-line bg-white p-5 sm:p-6 shadow-sm">
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-brass-ghost text-brass">
                    <ShieldCheck size={22} weight="duotone" />
                  </div>
                  <h3 className="mt-4 sm:mt-5 font-display text-base sm:text-lg font-semibold text-ink">
                    Legal & Title Due Diligence
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted">
                    We independently vet RERA status, developer sanctions, municipal tax receipts, and chain-of-title before listing.
                  </p>
                </div>

                <div className="rounded-2xl border border-line bg-white p-5 sm:p-6 shadow-sm">
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-brass-ghost text-brass">
                    <Handshake size={22} weight="duotone" />
                  </div>
                  <h3 className="mt-4 sm:mt-5 font-display text-base sm:text-lg font-semibold text-ink">
                    Direct Pricing, Zero Games
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted">
                    Transparent rates direct from owners and developers. No hidden commissions, unexpected transfer costs, or inflated figures.
                  </p>
                </div>

                <div className="rounded-2xl border border-line bg-white p-5 sm:p-6 shadow-sm">
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-brass-ghost text-brass">
                    <FileText size={22} weight="duotone" />
                  </div>
                  <h3 className="mt-4 sm:mt-5 font-display text-base sm:text-lg font-semibold text-ink">
                    Registry & Loan Concierge
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted">
                    From home loan approval with top national banks to deed drafting, stamping, and West Bengal registry coordination.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================================
              6. LIVE INTERACTIVE EMI & INVESTMENT CALCULATOR WIDGET
             ================================================================= */}
          <section className="shell py-14 sm:py-20 md:py-28">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
              <p className="eyebrow text-brass">Financial Transparency</p>
              <h2 className="mt-3 font-display text-2xl sm:text-3xl font-medium tracking-tight text-ink md:text-4xl">
                Plan your property investment with clarity
              </h2>
              <p className="mt-3 text-sm text-muted">
                Calculate monthly loan EMIs and estimate West Bengal municipal stamp duty and registration fees in real-time.
              </p>
            </div>

            <EmiCalculator initialPrice={8500000} title="Kolkata Residence EMI & Investment Planner" />
          </section>

          {/* =================================================================
              7. SOCIAL PROOF & INSTAGRAM VIDEO TOURS
             ================================================================= */}
          <ReelsSection reels={reels} instagram={site.instagram} />

          {/* =================================================================
              7.5. FOUNDER & LEADERSHIP SPOTLIGHT (BUILT AROUND TRUST)
             ================================================================= */}
          <div id="about" className="border-t border-line bg-white/70 py-14 sm:py-20 md:py-28">
            <FounderSection
              compact
              phone={site.phone}
              instagram={site.instagram}
              whatsapp={site.whatsapp}
            />
          </div>

          {/* =================================================================
              8. VERIFIED CLIENT REVIEWS
             ================================================================= */}
          <TestimonialStrip testimonials={testimonials} />

          {/* =================================================================
              9. REAL ESTATE JOURNAL & INSIGHTS
             ================================================================= */}
          {posts.length > 0 ? (
            <section className="shell-wide py-14 sm:py-20 border-t border-line">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
                <div>
                  <p className="eyebrow text-brass">Kolkata Property Journal</p>
                  <h2 className="mt-2 sm:mt-3 font-display text-2xl sm:text-3xl font-medium tracking-tight text-ink">
                    Market intelligence & buyer guides
                  </h2>
                </div>
                <Link
                  to="/journal"
                  className="text-sm font-semibold text-brass hover:text-ink"
                >
                  All articles →
                </Link>
              </div>

              <div className="mt-6 sm:mt-10 grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    to="/journal/$slug"
                    params={{ slug: post.slug }}
                    className="group flex flex-col justify-between rounded-2xl border border-line bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brass/50 hover:shadow-md"
                  >
                    <div>
                      <span className="text-[11px] font-semibold text-muted">
                        {formatDate(post.publish_date)} · {post.author}
                      </span>
                      <h3 className="mt-2 font-display text-lg sm:text-xl font-medium leading-snug text-ink transition-colors group-hover:text-brass">
                        {post.title}
                      </h3>
                      <p className="mt-2 sm:mt-3 line-clamp-3 text-xs sm:text-sm leading-relaxed text-muted">
                        {post.excerpt}
                      </p>
                    </div>
                    <span className="mt-4 sm:mt-6 flex items-center gap-1 text-xs font-semibold text-brass">
                      Read analysis <ArrowRight size={12} />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {/* =================================================================
              10. FREQUENTLY ASKED QUESTIONS
             ================================================================= */}
          {faqs.length > 0 ? (
            <section className="border-t border-line bg-paper-2/60 py-14 sm:py-20">
              <div className="shell max-w-3xl">
                <div className="text-center">
                  <p className="eyebrow text-brass">Clear Answers</p>
                  <h2 className="mt-3 font-display text-2xl sm:text-3xl font-medium tracking-tight text-ink">
                    Questions buyers & investors ask us
                  </h2>
                </div>

                <div className="mt-8 sm:mt-10 space-y-3 sm:space-y-4">
                  {faqs.map((faq) => (
                    <FaqItem key={faq.id} faq={faq} />
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {/* =================================================================
              11. HIGH-CONVERTING VALUATION CTA BANNER
             ================================================================= */}
          <section className="border-t border-line bg-ink text-paper py-14 sm:py-20 md:py-28">
            <div className="shell max-w-4xl text-center">
              <span className="inline-block rounded-full bg-brass-ghost px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brass-2">
                Sell or Lease With SS Property
              </span>
              <h2 className="mt-5 sm:mt-6 font-display text-2xl sm:text-3xl md:text-5xl font-medium tracking-tight text-paper">
                Have a premium property in Kolkata? Let's find the right buyer.
              </h2>
              <p className="mt-4 sm:mt-6 max-w-xl mx-auto text-sm sm:text-[15px] leading-relaxed text-paper/70">
                We position your property directly in front of qualified HNIs and verified home seekers. Professional video tours, verified listings, and zero spam inquiries.
              </p>
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                <Link
                  to="/sell"
                  className="rounded-full bg-brass px-7 sm:px-8 py-3.5 sm:py-4 text-sm font-semibold text-ink shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-brass-2 text-center"
                >
                  Request a Free Valuation
                </Link>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-paper/20 px-7 sm:px-8 py-3.5 sm:py-4 text-sm font-semibold text-paper transition-colors hover:border-paper/60 text-center"
                >
                  WhatsApp Ujjawal Sharma
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <QuickViewModal
          property={quickViewProperty}
          onClose={() => setQuickViewProperty(null)}
        />
        <CompareDrawer />
        <FloatingConcierge />
      </div>
    </FooterSettingsContext.Provider>
  );
}

function FaqItem({ faq }: { faq: Faq }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-line bg-white shadow-sm overflow-hidden transition-colors">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-4 sm:p-5 text-left text-sm font-semibold text-ink hover:text-brass cursor-pointer gap-3"
      >
        <span>{faq.question}</span>
        <CaretDown
          size={18}
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180 text-brass" : "text-muted"}`}
        />
      </button>
      {open ? (
        <div className="border-t border-line/60 px-4 sm:px-5 pb-4 sm:pb-5 pt-3 text-xs sm:text-sm leading-relaxed text-muted">
          {faq.answer}
        </div>
      ) : null}
    </div>
  );
}
