import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { FooterSettingsContext } from "../components/footer-settings";
import { FloatingConcierge } from "../components/floating-concierge";
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
      { title: "About · SS Property" },
      { name: "description", content: "SS Property - verified real estate advisory for Kolkata. Every listing walked through, every paper checked." },
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
      note: settings.about_stat_1_note ?? "Across 10 Kolkata localities.",
    },
    {
      value: settings.about_stat_2_value ?? "100%",
      label: settings.about_stat_2_label ?? "Papers checked",
      note: settings.about_stat_2_note ?? "Title, dues and approvals verified before listing.",
    },
    {
      value: settings.about_stat_3_value ?? "1:1",
      label: settings.about_stat_3_label ?? "Dedicated advisor",
      note: settings.about_stat_3_note ?? "One person owns your search end to end.",
    },
  ];

  return (
    <div className="min-h-dvh">
      <Header />
      <FloatingConcierge />
      <main className="pt-16">
        <section className="border-b border-line bg-paper-2/60">
          <div className="shell py-14 md:py-20">
            <p className="eyebrow">About us</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-tight tracking-tight text-ink md:text-5xl">
              We walk through every home before we list it.
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
              {settings.about_intro ??
                "SS Property is a Kolkata-based real estate advisory. We verify every listing in person - structure, papers, neighbourhood - so buyers see only what is real, and sellers deal only with serious people."}
            </p>
          </div>
        </section>

        <section className="shell-wide grid gap-14 py-14 lg:grid-cols-3">
          {stats.map((s, i) => (
            <div key={s.label} className="reveal">
              <p className="stat-value font-display text-5xl font-medium text-ink">{s.value}</p>
              <p className="mt-2 text-sm font-semibold text-ink">{s.label}</p>
              <p className="mt-1 text-sm text-muted">{s.note}</p>
              {i === 0 && count > 0 && !settings.about_stat_1_value ? null : null}
            </div>
          ))}
        </section>

        <section className="shell-wide pb-24">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="reveal rounded-[var(--radius-card)] border border-line bg-white p-8">
              <h2 className="font-display text-2xl font-medium text-ink">What we do</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                <li>Curated resale and new flats across Lake Town, Newtown, Kasba, Rajarhat and more.</li>
                <li>Full-stack selling support: valuation, photography, listing, buyer screening.</li>
                <li>Honest pricing guidance based on real closed deals, not asking prices.</li>
              </ul>
            </div>
            <div className="reveal rounded-[var(--radius-card)] border border-line bg-white p-8">
              <h2 className="font-display text-2xl font-medium text-ink">Talk to us</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Buying, selling or just figuring out the market - the conversation is free.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={settings.phone ? `tel:${settings.phone.replace(/[^\d+]/g, "")}` : "tel:+919429693786"}
                  className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition-transform hover:-translate-y-0.5"
                >
                  {settings.phone ?? "+91 94296 93786"}
                </a>
                <Link
                  to="/properties"
                  className="rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink/50"
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
