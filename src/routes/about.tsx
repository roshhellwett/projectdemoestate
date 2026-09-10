import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { initRevealOnScroll } from "../lib/reveal";
import { getSupabaseForRoute } from "../lib/route-supabase";
import { listProperties } from "../lib/queries";
import { SITE } from "../lib/site";

export const Route = createFileRoute("/about")({
  loader: async () => {
    const properties = await listProperties(getSupabaseForRoute(), {});
    return { count: properties.length };
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
  const { count } = Route.useLoaderData();

  useEffect(() => {
    initRevealOnScroll();
  }, []);

  return (
    <div className="min-h-dvh">
      <Header />
      <main className="pt-16">
        <section className="border-b border-line bg-paper-2/60">
          <div className="shell py-14 md:py-20">
            <p className="eyebrow">About us</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-tight tracking-tight text-ink md:text-5xl">
              We walk through every home before we list it.
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
              SS Property is a Kolkata-based real estate advisory. We verify every listing in person -
              structure, papers, neighbourhood - so buyers see only what is real, and sellers deal only
              with serious people.
            </p>
          </div>
        </section>

        <section className="shell-wide grid gap-14 py-14 lg:grid-cols-3">
          <div className="reveal">
            <p className="font-display text-5xl font-medium text-ink">{count}+</p>
            <p className="mt-2 text-sm font-semibold text-ink">Live verified listings</p>
            <p className="mt-1 text-sm text-muted">Across 10 Kolkata localities.</p>
          </div>
          <div className="reveal">
            <p className="font-display text-5xl font-medium text-ink">100%</p>
            <p className="mt-2 text-sm font-semibold text-ink">Papers checked</p>
            <p className="mt-1 text-sm text-muted">Title, dues and approvals verified before listing.</p>
          </div>
          <div className="reveal">
            <p className="font-display text-5xl font-medium text-ink">1:1</p>
            <p className="mt-2 text-sm font-semibold text-ink">Dedicated advisor</p>
            <p className="mt-1 text-sm text-muted">One person owns your search end to end.</p>
          </div>
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
                  href={SITE.phoneHref}
                  className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition-transform hover:-translate-y-0.5"
                >
                  {SITE.phone}
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
      <Footer />
    </div>
  );
}
