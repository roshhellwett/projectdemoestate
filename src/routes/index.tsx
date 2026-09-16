import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { FooterSettingsContext } from "../components/footer-settings";
import { PropertyCard } from "../components/property-card";
import { FloatingConcierge } from "../components/floating-concierge";
import { HeroSearch } from "../components/hero-search";
import { LocalityCorridorsSection } from "../components/locality-corridors";
import { NeighborhoodRadar } from "../components/neighborhood-radar";
import { QuickViewModal } from "../components/quick-view-modal";
import { CompareDrawer } from "../components/compare-drawer";
import { EmiCalculator } from "../components/emi-calculator";
import { ReelsSection, TestimonialStrip } from "../components/sections";
import { initRevealOnScroll } from "../lib/reveal";
import { formatDate, formatPrice } from "../lib/format";
import { getSupabaseForRoute } from "../lib/route-supabase";
import { applySettings } from "../lib/site";
import {
  listBlogPosts,
  listFaqs,
  listPartners,
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
  BuildingOffice,
  HouseLine,
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
    ],
  }),
  loader: async () => {
    const supabase = getSupabaseForRoute();
    const [featured, latest, reels, posts, faqs, testimonials, partners, settings, localities] =
      await Promise.all([
        listProperties(supabase, { featuredOnly: true, limit: 6 }),
        listProperties(supabase, { limit: 12 }),
        listReels(supabase),
        listBlogPosts(supabase, 3),
        listFaqs(supabase),
        listPublishedTestimonials(supabase),
        listPartners(supabase),
        getSiteSettings(supabase),
        listLocalities(supabase),
      ]);

    const corridorCounts: Record<string, number> = {};
    for (const loc of localities) {
      corridorCounts[loc.locality] = loc.count;
    }

    return {
      featured,
      latest,
      reels,
      posts,
      faqs,
      testimonials,
      partners,
      settings,
      corridorCounts,
      site: applySettings(settings),
    };
  },
  component: HomePage,
});

function HomePage() {
  const { featured, latest, reels, posts, faqs, testimonials, partners, settings, corridorCounts, site } =
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

  const heroTitle = settings.hero_title ?? "Kolkata’s Most Coveted Addresses. Personally Verified.";
  const [line1, line2 = ""] = heroTitle.split(". ").length > 1
    ? [`${heroTitle.split(". ")[0]}.`, heroTitle.split(". ").slice(1).join(". ")]
    : [heroTitle, ""];

  return (
    <FooterSettingsContext.Provider value={settings}>
      <div className="min-h-dvh bg-paper text-ink selection:bg-brass-ghost selection:text-ink">
        <Header />

        <main>
          {/* =================================================================
              1. HERO SECTION
             ================================================================= */}
          <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24 border-b border-line/60">
            {/* Ambient Lighting & Luxury Backdrops */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-b from-paper-2/90 via-paper to-paper" />
              <div className="hero-glow absolute -right-32 -top-32 h-[38rem] w-[38rem] rounded-full bg-brass-ghost blur-3xl opacity-70" />
              <div className="absolute -left-40 top-1/2 h-[30rem] w-[30rem] rounded-full bg-brass-ghost/50 blur-3xl" />
            </div>

            <div className="shell-wide">
              <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
                {/* Hero Left Column: Copy & Value Proposition */}
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-brass/40 bg-brass-ghost/40 px-3.5 py-1 text-xs font-semibold text-ink backdrop-blur-sm">
                    <SealCheck size={15} weight="fill" className="text-verdigris" />
                    <span>{settings.hero_eyebrow ?? "Kolkata’s Premier Property Consultancy"}</span>
                  </div>

                  <h1 className="mt-5 font-display text-[clamp(2.75rem,5.5vw,4.75rem)] font-medium leading-[1.06] tracking-tight text-ink">
                    <span className="hero-line"><span>{line1}</span></span>
                    {line2 ? (
                      <span className="hero-line">
                        <span className="italic font-normal text-brass">{line2}</span>
                      </span>
                    ) : null}
                  </h1>

                  <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-muted">
                    {settings.hero_subtitle ??
                      "Hand-verified flats, penthouses and commercial spaces across Lake Town, Newtown, Kasba, Rajarhat, and Greater Kolkata. Every property personally inspected, every legal title verified."}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Link
                      to="/properties"
                      className="rounded-full bg-ink px-8 py-4 text-sm font-semibold text-paper shadow-lg shadow-ink/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-2 active:translate-y-0"
                    >
                      {featured.length + latest.length > 0 ? `Explore ${featured.length + latest.length} Residences` : "Explore Residences"}
                    </Link>
                    <a
                      href={site.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-full border border-line bg-white/80 px-7 py-4 text-sm font-semibold text-ink backdrop-blur-sm transition-all hover:border-brass hover:bg-white"
                    >
                      <span>Speak with an Advisor</span>
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>

                {/* Hero Right Column: High-End Visual Showcase */}
                <div className="relative">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-line bg-paper-2 shadow-[0_32px_64px_-24px_rgba(18,16,14,0.22)]">
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
              <div className="mt-14 md:mt-20">
                <HeroSearch totalCount={totalPropertiesCount} />
              </div>

              {/* Trust Stat Ticker */}
              <div className="mt-12 grid grid-cols-2 gap-4 border-t border-line/70 pt-8 sm:grid-cols-4">
                <div>
                  <p className="font-display text-2xl md:text-3xl font-bold text-ink">₹150+ Cr</p>
                  <p className="mt-1 text-xs text-muted font-medium">Curated Property Value</p>
                </div>
                <div>
                  <p className="font-display text-2xl md:text-3xl font-bold text-ink">
                    {totalPropertiesCount > 0 ? `${totalPropertiesCount} Prime` : "Bespoke"}
                  </p>
                  <p className="mt-1 text-xs text-muted font-medium">Verified Kolkata Listings</p>
                </div>
                <div>
                  <p className="font-display text-2xl md:text-3xl font-bold text-ink">100%</p>
                  <p className="mt-1 text-xs text-muted font-medium">Physical Site Inspection</p>
                </div>
                <div>
                  <p className="font-display text-2xl md:text-3xl font-bold text-ink">0%</p>
                  <p className="mt-1 text-xs text-muted font-medium">Hidden Charges / Mislead</p>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================================
              3. PRIME KOLKATA CORRIDORS (LOCALITY SHOWCASE)
             ================================================================= */}
          <LocalityCorridorsSection corridorCounts={corridorCounts} />

          {/* =================================================================
              3.5. SPATIAL CORRIDOR RADAR & COMMUTE MATRIX
             ================================================================= */}
          <NeighborhoodRadar corridorCounts={corridorCounts} />

          {/* =================================================================
              4. FEATURED RESIDENCES CATALOG
             ================================================================= */}
          <section className="shell-wide py-20 md:py-28 border-t border-line">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow flex items-center gap-1.5 text-brass">
                  <Sparkle size={14} weight="fill" />
                  Curated Catalog
                </p>
                <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">
                  Featured residences & workspaces
                </h2>
                <p className="mt-3 max-w-xl text-sm text-muted">
                  Hand-picked flats, penthouses and commercial spaces across Lake Town, Kasba, Newtown and Rajarhat.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
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
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
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
                {/* Property Cards Grid */}
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {displayedProperties.map((property, idx) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      priority={idx < 3}
                      onQuickView={setQuickViewProperty}
                    />
                  ))}
                </div>

                <div className="mt-12 text-center">
                  <Link
                    to="/properties"
                    className="inline-flex items-center gap-2 rounded-full border border-ink/30 bg-white px-8 py-3.5 text-sm font-semibold text-ink shadow-sm transition-all hover:border-ink hover:bg-paper-2"
                  >
                    <span>Browse All {totalPropertiesCount} Properties</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </>
            ) : (
              /* Luxury Onboarding Empty State */
              <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border border-line bg-white p-10 md:p-16 text-center shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brass-ghost text-brass">
                  <Sparkle size={28} weight="fill" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-medium text-ink">
                  Onboarding Verified Residences
                </h3>
                <p className="mt-2 max-w-lg text-xs md:text-sm text-muted leading-relaxed">
                  The SS Property advisory desk is currently conducting on-ground walkthroughs and legal title verifications for upcoming Kolkata inventory. Are you an owner looking to list?
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    to="/sell"
                    className="rounded-full bg-ink px-7 py-3 text-xs font-bold uppercase tracking-wider text-paper shadow-md hover:bg-ink-2 transition-all"
                  >
                    List Your Property
                  </Link>
                  <a
                    href={site.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-line bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-ink hover:border-brass transition-all"
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
          <section className="border-y border-line bg-paper-2/70 py-20 md:py-28">
            <div className="shell">
              <div className="text-center max-w-2xl mx-auto">
                <p className="eyebrow text-brass">The SS Property Standard</p>
                <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">
                  Real estate done with uncompromised integrity
                </h2>
                <p className="mt-4 text-sm text-muted leading-relaxed">
                  In a market crowded with stock photos, inflated claims, and phantom listings, SS Property is built on one simple rule: absolute ground reality.
                </p>
              </div>

              <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brass-ghost text-brass">
                    <Eye size={24} weight="duotone" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                    100% Physical Walkthroughs
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    No renders or stock photography. Every single home in our catalog has been physically stepped into, measured, and photographed.
                  </p>
                </div>

                <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brass-ghost text-brass">
                    <ShieldCheck size={24} weight="duotone" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                    Legal & Title Due Diligence
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    We independently vet RERA status, developer sanctions, municipal tax receipts, and chain-of-title before listing.
                  </p>
                </div>

                <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brass-ghost text-brass">
                    <Handshake size={24} weight="duotone" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                    Direct Pricing, Zero Games
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    Transparent rates direct from owners and developers. No hidden commissions, unexpected transfer costs, or inflated figures.
                  </p>
                </div>

                <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brass-ghost text-brass">
                    <FileText size={24} weight="duotone" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                    Registry & Loan Concierge
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    From home loan approval with top national banks to deed drafting, stamping, and West Bengal registry coordination.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================================
              6. LIVE INTERACTIVE EMI & INVESTMENT CALCULATOR WIDGET
             ================================================================= */}
          <section className="shell py-20 md:py-28">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="eyebrow text-brass">Financial Transparency</p>
              <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">
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
              8. VERIFIED CLIENT REVIEWS
             ================================================================= */}
          <TestimonialStrip testimonials={testimonials} />

          {/* =================================================================
              9. REAL ESTATE JOURNAL & INSIGHTS
             ================================================================= */}
          {posts.length > 0 ? (
            <section className="shell-wide py-20 border-t border-line">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <p className="eyebrow text-brass">Kolkata Property Journal</p>
                  <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink">
                    Market intelligence & buyer guides
                  </h2>
                </div>
                <Link
                  to="/journal"
                  className="hidden text-sm font-semibold text-brass hover:text-ink sm:block"
                >
                  All articles →
                </Link>
              </div>

              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    to="/journal/$slug"
                    params={{ slug: post.slug }}
                    className="group flex flex-col justify-between rounded-2xl border border-line bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brass/50 hover:shadow-md"
                  >
                    <div>
                      <span className="text-[11px] font-semibold text-muted">
                        {formatDate(post.publish_date)} · {post.author}
                      </span>
                      <h3 className="mt-2 font-display text-xl font-medium leading-snug text-ink transition-colors group-hover:text-brass">
                        {post.title}
                      </h3>
                      <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-muted">
                        {post.excerpt}
                      </p>
                    </div>
                    <span className="mt-6 flex items-center gap-1 text-xs font-semibold text-brass">
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
            <section className="border-t border-line bg-paper-2/60 py-20">
              <div className="shell max-w-3xl">
                <div className="text-center">
                  <p className="eyebrow text-brass">Clear Answers</p>
                  <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink">
                    Questions buyers & investors ask us
                  </h2>
                </div>

                <div className="mt-10 space-y-4">
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
          <section className="border-t border-line bg-ink text-paper py-20 md:py-28">
            <div className="shell max-w-4xl text-center">
              <span className="inline-block rounded-full bg-brass-ghost px-4 py-1 text-xs font-semibold uppercase tracking-wider text-brass-2">
                Sell or Lease With SS Property
              </span>
              <h2 className="mt-6 font-display text-3xl md:text-5xl font-medium tracking-tight text-paper">
                Have a premium property in Kolkata? Let’s find the right buyer.
              </h2>
              <p className="mt-6 max-w-xl mx-auto text-[15px] leading-relaxed text-paper/70">
                We position your property directly in front of qualified HNIs and verified home seekers. Professional video tours, verified listings, and zero spam inquiries.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  to="/sell"
                  className="rounded-full bg-brass px-8 py-4 text-sm font-semibold text-ink shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-brass-2"
                >
                  Request a Free Valuation
                </Link>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-paper/20 px-8 py-4 text-sm font-semibold text-paper transition-colors hover:border-paper/60"
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
        className="flex w-full items-center justify-between p-5 text-left text-sm font-semibold text-ink hover:text-brass"
      >
        <span>{faq.question}</span>
        <CaretDown
          size={16}
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180 text-brass" : "text-muted"}`}
        />
      </button>
      {open ? (
        <div className="border-t border-line/60 px-5 pb-5 pt-3 text-xs leading-relaxed text-muted">
          {faq.answer}
        </div>
      ) : null}
    </div>
  );
}
