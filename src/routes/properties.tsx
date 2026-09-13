import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { FooterSettingsContext } from "../components/footer-settings";
import { PropertyCard } from "../components/property-card";
import { initRevealOnScroll } from "../lib/reveal";
import { getSupabaseForRoute } from "../lib/route-supabase";
import { getSiteSettings, listLocalities, listProperties } from "../lib/queries";

export interface Search {
  q?: string;
  locality?: string;
  bhk?: string;
}

export const Route = createFileRoute("/properties")({
  head: () => ({
    meta: [
      { title: "Properties for Sale in Kolkata · SS Property" },
      {
        name: "description",
        content: "Browse verified flats, penthouses and commercial spaces across Kolkata. Filter by locality, BHK and budget.",
      },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): Search => ({
    q: typeof search.q === "string" ? search.q : "",
    locality: typeof search.locality === "string" ? search.locality : "All",
    bhk: typeof search.bhk === "string" ? search.bhk : "",
  }),
  loaderDeps: ({ search: { q = "", locality = "All", bhk = "" } }) => ({ q, locality, bhk }),
  loader: async ({ deps }) => {
    const supabase = getSupabaseForRoute();
    const [properties, localities, settings] = await Promise.all([
      listProperties(supabase, {
        q: deps.q || undefined,
        locality: deps.locality,
        bhk: deps.bhk || undefined,
      }),
      listLocalities(supabase),
      getSiteSettings(supabase),
    ]);
    return { properties, localities, settings };
  },
  component: PropertiesPage,
});

const BHK_FILTERS = ["", "2", "3", "4", "commercial"] as const;
const BHK_LABELS: Record<string, string> = {
  "": "Any",
  "2": "2 BHK",
  "3": "3 BHK",
  "4": "4 BHK",
  commercial: "Commercial",
};

function PropertiesPage() {
  const { properties, localities, settings } = Route.useLoaderData();
  const search = Route.useSearch() as Required<Search>;
  const navigate = Route.useNavigate();
  const [q, setQ] = useState(search.q);
  const [prevSearchQ, setPrevSearchQ] = useState(search.q);
  if (search.q !== prevSearchQ) {
    setPrevSearchQ(search.q);
    setQ(search.q);
  }

  useEffect(() => {
    initRevealOnScroll();
  }, [properties]);

  // Debounced search pushes to URL (shareable, SSR-able state)
  useEffect(() => {
    const t = setTimeout(() => {
      if (q !== search.q) {
        navigate({ search: { ...search, q }, replace: true });
      }
    }, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const setFilter = (patch: Partial<Search>) => {
    navigate({ search: { ...search, ...patch }, replace: true });
  };

  return (
    <div className="min-h-dvh">
      <Header />
      <main className="pt-16">
        {/* heading */}
        <section className="border-b border-line bg-paper-2/60">
          <div className="shell py-14 md:py-20">
            <p className="eyebrow">{properties.length} verified listings</p>
            <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-ink md:text-5xl">
              Find your address in Kolkata
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
              {settings.properties_intro ??
                "Filter by locality, configuration and budget - every listing verified in person."}
            </p>
          </div>
        </section>

        {/* search + facets */}
        <section className="sticky top-16 z-20 border-b border-line bg-paper/90 backdrop-blur-md">
          <div className="shell flex flex-col gap-3 py-4">
            <div className="flex flex-wrap items-center gap-3">
              <label className="relative flex-1 min-w-56">
                <span className="sr-only">Search properties</span>
                <input
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search locality, project, keyword…"
                  className="w-full rounded-full border border-line bg-white px-5 py-2.5 text-sm text-ink placeholder:text-muted-2 focus:border-brass focus:outline-none"
                />
              </label>

              <label className="relative">
                <span className="sr-only">Locality</span>
                <select
                  value={search.locality}
                  onChange={(e) => setFilter({ locality: e.target.value })}
                  className="appearance-none rounded-full border border-line bg-white px-5 py-2.5 pr-10 text-sm font-medium text-ink focus:border-brass focus:outline-none"
                >
                  <option value="All">All areas</option>
                  {localities.map((l) => (
                    <option key={l.locality} value={l.locality}>
                      {l.locality} ({l.count})
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted">
                  ▾
                </span>
              </label>
            </div>

            <div className="flex flex-wrap gap-2" role="group" aria-label="Bedrooms">
              {BHK_FILTERS.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setFilter({ bhk: b })}
                  aria-pressed={search.bhk === b}
                  className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                    search.bhk === b
                      ? "border-ink bg-ink text-paper"
                      : "border-line bg-white text-muted hover:border-brass hover:text-ink"
                  }`}
                >
                  {BHK_LABELS[b]}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* grid */}
        <section className="shell-wide py-12">
          {properties.length === 0 ? (
            <EmptyState q={search.q} />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {properties.map((p, i) => (
                <div key={p.id} className="reveal" style={{ transitionDelay: `${Math.min(i, 6) * 40}ms` }}>
                  <PropertyCard property={p} priority={i < 3} />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <FooterSettingsContext.Provider value={settings}>
        <Footer />
      </FooterSettingsContext.Provider>
    </div>
  );
}

function EmptyState({ q }: { q: string }) {
  return (
    <div className="mx-auto max-w-md py-24 text-center">
      <p className="font-display text-2xl text-ink">Nothing matches that yet.</p>
      <p className="mt-3 text-sm text-muted">
        {q ? `No results for “${q}”. ` : ""}Try clearing the filters, or tell us what you are looking for and
        we will find it.
      </p>
      <Link
        to="/sell"
        className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper"
      >
        Post a Requirement
      </Link>
    </div>
  );
}
