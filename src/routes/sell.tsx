import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { FooterSettingsContext } from "../components/footer-settings";
import { SellForm } from "../components/sell-form";
import { initRevealOnScroll } from "../lib/reveal";
import { getSupabaseForRoute } from "../lib/route-supabase";
import { getSiteSettings } from "../lib/queries";

export const Route = createFileRoute("/sell")({
  loader: async () => ({ settings: await getSiteSettings(getSupabaseForRoute()) }),
  head: () => ({
    meta: [
      { title: "Sell Your Property · SS Property" },
      { name: "description", content: "List your Kolkata property with SS Property. Fair valuation, verified buyers, zero pressure." },
    ],
  }),
  component: SellPage,
});

const STEPS = [
  { title: "Tell us about the property", body: "Fill the form. Our valuation team calls within one working day." },
  { title: "We visit and verify", body: "A walkthrough, papers checked, honest price estimate - no obligation." },
  { title: "We list and screen buyers", body: "Professional photos, verified listing, only serious buyers reach you." },
  { title: "Deal closed, paperwork done", body: "Negotiation, agreement and registration handled end to end." },
];

function SellPage() {
  const { settings } = Route.useLoaderData();

  useEffect(() => {
    initRevealOnScroll();
  }, []);

  return (
    <div className="min-h-dvh">
      <Header />
      <main className="pt-16">
        <section className="border-b border-line bg-paper-2/60">
          <div className="shell py-14 md:py-20">
            <p className="eyebrow">Sell with SS Property</p>
            <h1 className="mt-4 max-w-2xl font-display text-4xl font-medium leading-tight tracking-tight text-ink md:text-5xl">
              Your property deserves the right buyers, not just any buyers.
            </h1>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted">
              {settings.sell_intro ??
                "Thousands of qualified buyers search with us every month. We verify, photograph and market your listing so serious people come to you."}
            </p>
          </div>
        </section>

        <section className="shell-wide grid gap-14 py-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="font-display text-2xl font-medium tracking-tight text-ink">How it works</h2>
            <ol className="mt-6 space-y-6">
              {STEPS.map((s, i) => (
                <li key={s.title} className="reveal flex gap-4">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brass/50 text-xs font-semibold text-brass">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold text-ink">{s.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-[var(--radius-card)] border border-line bg-paper-2/50 p-6 md:p-10">
            <h2 className="font-display text-2xl font-medium tracking-tight text-ink">List your property</h2>
            <p className="mt-1 text-sm text-muted">Free to submit. No obligation to list.</p>
            <div className="mt-8">
              <SellForm kind="sell" />
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
