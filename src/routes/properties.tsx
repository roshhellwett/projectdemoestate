import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { FooterSettingsContext } from "../components/footer-settings";
import { PropertyCard } from "../components/property-card";
import { FloatingConcierge } from "../components/floating-concierge";
import { QuickViewModal } from "../components/quick-view-modal";
import { CompareDrawer } from "../components/compare-drawer";
import { useFavorites } from "../lib/favorites";
import { initRevealOnScroll } from "../lib/reveal";
import { getSupabaseForRoute } from "../lib/route-supabase";
import { getSiteSettings, listLocalities, listProperties } from "../lib/queries";
import { SITE } from "../lib/site";
import type { Property } from "../lib/types";
import {
  MagnifyingGlass,
  SlidersHorizontal,
  SquaresFour,
  Rows,
  Heart,
  X,
  Sparkle,
  ArrowCounterClockwise,
  MapPin,
  CheckCircle,
} from "@phosphor-icons/react";

export interface Search {
  q?: string;
  locality?: string;
  bhk?: string;
  budget?: string;
  possession?: string;
  furnishing?: string;
  sort?: string;
  view?: "grid" | "list";
  savedOnly?: boolean;
}

export const Route = createFileRoute("/properties")({
  head: () => ({
    meta: [
      { title: "Kolkata Luxury Properties for Sale & Lease · SS Property" },
      {
        name: "description",
        content:
          "Browse verified flats, penthouses and commercial spaces across Lake Town, Newtown, Kasba, Rajarhat, Bangur Avenue and Greater Kolkata. Filter by locality, budget, and BHK.",
      },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): Search => ({
    q: typeof search.q === "string" ? search.q : "",
    locality: typeof search.locality === "string" ? search.locality : "All",
    bhk: typeof search.bhk === "string" ? search.bhk : "",
    budget: typeof search.budget === "string" ? search.budget : "",
    possession: typeof search.possession === "string" ? search.possession : "",
    furnishing: typeof search.furnishing === "string" ? search.furnishing : "",
    sort: typeof search.sort === "string" ? search.sort : "featured",
    view: search.view === "list" ? "list" : "grid",
    savedOnly: search.savedOnly === true || search.savedOnly === "true",
  }),
  loaderDeps: ({ search }) => ({
    q: search.q || "",
    locality: search.locality || "All",
    bhk: search.bhk || "",
    budget: search.budget || "",
    possession: search.possession || "",
    furnishing: search.furnishing || "",
    sort: search.sort || "featured",
    view: search.view || "grid",
    savedOnly: !!search.savedOnly,
  }),
  loader: async ({ deps }) => {
    const supabase = getSupabaseForRoute();

    let minPrice: number | undefined;
    let maxPrice: number | undefined;
    if (deps.budget === "under-75") {
      maxPrice = 7500000;
    } else if (deps.budget === "75-150") {
      minPrice = 7500000;
      maxPrice = 15000000;
    } else if (deps.budget === "150-plus") {
      minPrice = 15000000;
    }

    const [properties, localities, settings] = await Promise.all([
      listProperties(supabase, {
        q: deps.q || undefined,
        locality: deps.locality,
        bhk: deps.bhk || undefined,
        minPrice,
        maxPrice,
        possession: deps.possession || undefined,
        furnishing: deps.furnishing || undefined,
        sort: deps.sort,
      }),
      listLocalities(supabase),
      getSiteSettings(supabase),
    ]);
    return { properties, localities, settings };
  },
  component: PropertiesPage,
});

const BHK_FILTERS = [
  { id: "", label: "All Configs" },
  { id: "2", label: "2 BHK" },
  { id: "3", label: "3 BHK" },
  { id: "4", label: "4 BHK" },
  { id: "commercial", label: "Commercial" },
];

const BUDGET_FILTERS = [
  { id: "", label: "Any Budget" },
  { id: "under-75", label: "Under ₹75 Lakhs" },
  { id: "75-150", label: "₹75L - ₹1.50 Cr" },
  { id: "150-plus", label: "₹1.50 Cr & Above" },
];

function PropertiesPage() {
  const { properties, localities, settings } = Route.useLoaderData();
  const search = Route.useSearch() as Required<Search>;
  const navigate = Route.useNavigate();
  const { isFavorite, count: favoritesCount } = useFavorites();
  const [quickViewProperty, setQuickViewProperty] = useState<Property | null>(null);

  const [q, setQ] = useState(search.q);
  const [prevSearchQ, setPrevSearchQ] = useState(search.q);
  if (search.q !== prevSearchQ) {
    setPrevSearchQ(search.q);
    setQ(search.q);
  }

  useEffect(() => {
    initRevealOnScroll();
  }, [properties]);

  // Debounced search query update
  useEffect(() => {
    const t = setTimeout(() => {
      if (q !== search.q) {
        navigate({ search: { ...search, q }, replace: true });
      }
    }, 350);
    return () => clearTimeout(t);
  }, [q, navigate, search]);

  const setFilter = (patch: Partial<Search>) => {
    navigate({ search: { ...search, ...patch }, replace: true });
  };

  const resetAllFilters = () => {
    navigate({
      search: {
        q: "",
        locality: "All",
        bhk: "",
        budget: "",
        possession: "",
        furnishing: "",
        sort: "featured",
        view: search.view,
        savedOnly: false,
      },
      replace: true,
    });
    setQ("");
  };

  // Filter client-side if savedOnly is enabled
  const filteredProperties = useMemo(() => {
    if (!search.savedOnly) return properties;
    return properties.filter((p) => isFavorite(p.id));
  }, [properties, search.savedOnly, isFavorite]);

  const isAnyFilterActive =
    !!search.q ||
    search.locality !== "All" ||
    !!search.bhk ||
    !!search.budget ||
    !!search.possession ||
    !!search.furnishing ||
    search.savedOnly;

  return (
    <FooterSettingsContext.Provider value={settings}>
      <div className="min-h-dvh bg-paper text-ink selection:bg-brass-ghost">
        <Header />
        <FloatingConcierge />

        <main className="pt-18">
          {/* =================================================================
              1. PAGE BANNER
             ================================================================= */}
          <section className="border-b border-line bg-paper-2/70 py-12 md:py-16">
            <div className="shell-wide">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-brass/40 bg-white/80 px-3 py-1 text-xs font-semibold text-ink shadow-sm">
                    <Sparkle size={13} weight="fill" className="text-brass" />
                    <span>Curated Kolkata Real Estate Collection</span>
                  </div>
                  <h1 className="mt-3 font-display text-3xl md:text-5xl font-medium tracking-tight text-ink">
                    Find Your Prime Address
                  </h1>
                  <p className="mt-2 text-sm text-muted max-w-2xl leading-relaxed">
                    Explore physically verified residences and premium workspaces across Lake Town, Newtown, Kasba, Rajarhat and South Kolkata.
                  </p>
                </div>

                {/* Counter & View Switcher */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                    {properties.length > 0 ? `${filteredProperties.length} of ${properties.length} Listings` : "0 Active Listings"}
                  </span>

                  <div className="flex items-center rounded-xl border border-line bg-white p-1 shadow-sm">
                    <button
                      id="btn-view-grid"
                      type="button"
                      onClick={() => setFilter({ view: "grid" })}
                      aria-label="Grid view"
                      className={`rounded-lg p-1.5 transition-colors ${
                        search.view === "grid"
                          ? "bg-ink text-paper"
                          : "text-muted hover:text-ink"
                      }`}
                      title="Grid View"
                    >
                      <SquaresFour size={18} weight="bold" />
                    </button>
                    <button
                      id="btn-view-list"
                      type="button"
                      onClick={() => setFilter({ view: "list" })}
                      aria-label="List view"
                      className={`rounded-lg p-1.5 transition-colors ${
                        search.view === "list"
                          ? "bg-ink text-paper"
                          : "text-muted hover:text-ink"
                      }`}
                      title="Magazine List View"
                    >
                      <Rows size={18} weight="bold" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================================
              2. MULTI-FACET FILTERING BAR (STICKY)
             ================================================================= */}
          <section className="sticky top-18 z-30 border-b border-line bg-white/95 backdrop-blur-md py-4 shadow-sm">
            <div className="shell-wide space-y-3">
              {/* Top Controls Row: Search Input, Locality Dropdown, Sort, Favorites */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_0.9fr_auto_auto]">
                {/* Search text */}
                <div className="relative flex items-center">
                  <MagnifyingGlass
                    size={18}
                    className="absolute left-4 text-muted pointer-events-none"
                  />
                  <input
                    type="search"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search locality, landmark, project name…"
                    className="w-full rounded-xl border border-line bg-paper/60 pl-11 pr-10 py-2.5 text-xs font-medium text-ink placeholder:text-muted focus:border-brass focus:bg-white focus:outline-none"
                  />
                  {q ? (
                    <button
                      type="button"
                      onClick={() => {
                        setQ("");
                        setFilter({ q: "" });
                      }}
                      className="absolute right-3 text-muted hover:text-ink p-1"
                    >
                      <X size={14} />
                    </button>
                  ) : null}
                </div>

                {/* Locality Dropdown */}
                <div className="relative">
                  <select
                    value={search.locality}
                    onChange={(e) => setFilter({ locality: e.target.value })}
                    className="w-full appearance-none rounded-xl border border-line bg-paper/60 px-4 py-2.5 pr-8 text-xs font-semibold text-ink focus:border-brass focus:bg-white focus:outline-none cursor-pointer"
                  >
                    <option value="All">All Kolkata Corridors</option>
                    {localities.map((l) => (
                      <option key={l.locality} value={l.locality}>
                        {l.locality} ({l.count})
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted text-xs">
                    ▼
                  </span>
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={search.sort}
                    onChange={(e) => setFilter({ sort: e.target.value })}
                    className="w-full appearance-none rounded-xl border border-line bg-paper/60 px-4 py-2.5 pr-8 text-xs font-semibold text-ink focus:border-brass focus:bg-white focus:outline-none cursor-pointer"
                  >
                    <option value="featured">Sort: Featured First</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="area_desc">Area: Largest First</option>
                    <option value="newest">Newest Arrivals</option>
                  </select>
                  <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted text-xs">
                    ▼
                  </span>
                </div>

                {/* Saved Favorites Filter Toggle */}
                <button
                  type="button"
                  onClick={() => setFilter({ savedOnly: !search.savedOnly })}
                  className={`flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all ${
                    search.savedOnly
                      ? "border-danger bg-danger/10 text-danger"
                      : "border-line bg-paper/60 text-muted hover:border-brass hover:text-ink"
                  }`}
                >
                  <Heart
                    size={16}
                    weight={search.savedOnly ? "fill" : "regular"}
                    className={search.savedOnly ? "text-danger" : "text-muted"}
                  />
                  <span>Favorites ({favoritesCount})</span>
                </button>

                {/* Clear All Button */}
                {isAnyFilterActive ? (
                  <button
                    type="button"
                    onClick={resetAllFilters}
                    className="flex items-center gap-1.5 rounded-xl border border-line bg-white px-3.5 py-2.5 text-xs font-semibold text-muted hover:text-ink transition-colors"
                    title="Reset all filters"
                  >
                    <ArrowCounterClockwise size={15} />
                    <span className="hidden sm:inline">Reset</span>
                  </button>
                ) : null}
              </div>

              {/* Bottom Pills Row: BHK Types and Budget Tiers */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-line/40">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted mr-1">
                    BHK:
                  </span>
                  {BHK_FILTERS.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setFilter({ bhk: b.id })}
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                        search.bhk === b.id
                          ? "bg-ink text-paper shadow-sm"
                          : "border border-line bg-white text-muted hover:border-brass hover:text-ink"
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted mr-1">
                    Budget:
                  </span>
                  {BUDGET_FILTERS.map((bg) => (
                    <button
                      key={bg.id}
                      type="button"
                      onClick={() => setFilter({ budget: bg.id })}
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                        search.budget === bg.id
                          ? "bg-brass text-ink font-bold shadow-sm"
                          : "border border-line bg-white text-muted hover:border-brass hover:text-ink"
                      }`}
                    >
                      {bg.label}
                    </button>
                  ))}

                  {/* Ready to move chip */}
                  <button
                    type="button"
                    onClick={() =>
                      setFilter({
                        possession:
                          search.possession === "Ready To Move" ? "" : "Ready To Move",
                      })
                    }
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                      search.possession === "Ready To Move"
                        ? "bg-verdigris text-white shadow-sm"
                        : "border border-line bg-white text-muted hover:border-verdigris hover:text-verdigris"
                    }`}
                  >
                    ✓ Ready to Move
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Corridor Benchmark Insights Strip */}
          <div className="shell-wide pt-6 pb-2">
            <div className="flex items-center gap-2.5 overflow-x-auto pb-1 text-[11px] text-muted">
              <span className="shrink-0 font-bold uppercase tracking-wider text-brass flex items-center gap-1">
                <Sparkle size={13} weight="fill" />
                Capital Benchmarks:
              </span>
              <button
                type="button"
                onClick={() => setFilter({ locality: "Lake Town" })}
                className="shrink-0 rounded-full border border-line bg-white px-3 py-1 text-ink hover:border-brass transition-colors"
              >
                <strong>Lake Town & Bangur:</strong> ₹6,800 – ₹8,500/sq.ft
              </button>
              <button
                type="button"
                onClick={() => setFilter({ locality: "Newtown" })}
                className="shrink-0 rounded-full border border-line bg-white px-3 py-1 text-ink hover:border-brass transition-colors"
              >
                <strong>Newtown:</strong> ₹7,200 – ₹10,800/sq.ft
              </button>
              <button
                type="button"
                onClick={() => setFilter({ locality: "Kasba" })}
                className="shrink-0 rounded-full border border-line bg-white px-3 py-1 text-ink hover:border-brass transition-colors"
              >
                <strong>Kasba / Ruby:</strong> ₹7,500 – ₹11,200/sq.ft
              </button>
              <button
                type="button"
                onClick={() => setFilter({ locality: "Rajarhat" })}
                className="shrink-0 rounded-full border border-line bg-white px-3 py-1 text-ink hover:border-brass transition-colors"
              >
                <strong>Rajarhat:</strong> ₹5,500 – ₹7,800/sq.ft
              </button>
            </div>
          </div>

          {/* =================================================================
              3. PROPERTIES CATALOG LISTING
             ================================================================= */}
          <section className="shell-wide py-10 md:py-14">
            {filteredProperties.length > 0 ? (
              <div
                className={
                  search.view === "list"
                    ? "space-y-6"
                    : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                }
              >
                {filteredProperties.map((property, idx) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    priority={idx < 6}
                    layout={search.view}
                    onQuickView={setQuickViewProperty}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center rounded-3xl border border-line bg-white py-20 px-6 text-center shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brass-ghost text-brass">
                  {isAnyFilterActive ? (
                    <MagnifyingGlass size={32} weight="duotone" />
                  ) : (
                    <Sparkle size={32} weight="fill" />
                  )}
                </div>
                <h3 className="mt-5 font-display text-2xl font-medium text-ink">
                  {isAnyFilterActive
                    ? "No properties match your filter criteria"
                    : "Curating Kolkata's Prime Portfolio"}
                </h3>
                <p className="mt-2 text-xs text-muted max-w-md leading-relaxed">
                  {isAnyFilterActive
                    ? "Try adjusting your budget, locality, or configuration filters to discover available residences."
                    : "The SS Property collection is actively onboarding verified residences. Are you an owner or developer looking to list with us?"}
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  {isAnyFilterActive ? (
                    <button
                      type="button"
                      onClick={resetAllFilters}
                      className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-xs font-bold uppercase tracking-wider text-paper shadow-md transition-all hover:bg-ink-2"
                    >
                      <ArrowCounterClockwise size={15} />
                      <span>Reset All Filters</span>
                    </button>
                  ) : (
                    <>
                      <Link
                        to="/sell"
                        className="rounded-full bg-ink px-7 py-3 text-xs font-bold uppercase tracking-wider text-paper shadow-md hover:bg-ink-2 transition-all"
                      >
                        List Your Property
                      </Link>
                      <a
                        href={SITE.whatsapp}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-line bg-white px-7 py-3 text-xs font-bold uppercase tracking-wider text-ink hover:border-brass transition-all"
                      >
                        Speak with Concierge
                      </a>
                    </>
                  )}
                </div>
              </div>
            )}
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
