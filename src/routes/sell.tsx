import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { FooterSettingsContext } from "../components/footer-settings";
import { FloatingConcierge } from "../components/floating-concierge";
import { SellForm } from "../components/sell-form";
import { initRevealOnScroll } from "../lib/reveal";
import { getSupabaseForRoute } from "../lib/route-supabase";
import { getSiteSettings } from "../lib/queries";
import { Sparkle, ShieldCheck, Camera, Users, Certificate } from "@phosphor-icons/react";

export const Route = createFileRoute("/sell")({
  loader: async () => ({ settings: await getSiteSettings(getSupabaseForRoute()) }),
  head: () => ({
    meta: [
      { title: "Sell or Lease Your Kolkata Property · SS Property" },
      {
        name: "description",
        content:
          "List your Kolkata flat, penthouse, or commercial space with SS Property. Accurate market valuation, professional photography, verified HNI buyers, zero spam.",
      },
    ],
  }),
  component: SellPage,
});

const STEPS = [
  {
    icon: Certificate,
    title: "1. Share Property Coordinates",
    body: "Submit your address, layout, and expected valuation. Our market appraisal desk analyses active comps within 24 hours.",
  },
  {
    icon: Camera,
    title: "2. Walkthrough & Professional Media",
    body: "Our team conducts a physical on-ground visit, reviews title documents, and records high-definition walkthrough reels.",
  },
  {
    icon: Users,
    title: "3. Direct HNI & Buyer Marketing",
    body: "Your listing is showcased across our verified network of serious home seekers and investors. No tire-kickers or spam brokers.",
  },
  {
    icon: ShieldCheck,
    title: "4. Closing & Legal Registration",
    body: "We assist with agreement drafts, bank loan coordination, municipal tax clearances, and West Bengal deed registration.",
  },
];

function SellPage() {
  const { settings } = Route.useLoaderData();

  useEffect(() => {
    initRevealOnScroll();
  }, []);

  return (
    <FooterSettingsContext.Provider value={settings}>
      <div className="min-h-dvh bg-paper text-ink selection:bg-brass-ghost">
        <Header />
        <FloatingConcierge />

        <main className="pt-14 lg:pt-20">
          <section className="border-b border-line bg-paper-2/70 py-14 md:py-20">
            <div className="shell-wide">
              <div className="inline-flex items-center gap-2 rounded-full border border-brass/40 bg-white px-3.5 py-1 text-xs font-semibold text-ink shadow-sm">
                <Sparkle size={14} weight="fill" className="text-brass" />
                <span>Premier Property Representation</span>
              </div>
              <h1 className="mt-4 max-w-3xl font-display text-4xl md:text-5xl font-medium leading-tight tracking-tight text-ink">
                Your Kolkata Property Deserves Qualified Buyers, Not Cold Calls.
              </h1>
              <p className="mt-4 max-w-2xl text-sm md:text-base leading-relaxed text-muted">
                {settings.sell_intro ??
                  "SS Property connects your flat, penthouse or commercial floor directly with high-intent buyers across Lake Town, Newtown, Kasba, and Greater Kolkata."}
              </p>
            </div>
          </section>

          <section className="shell-wide grid gap-12 py-16 lg:grid-cols-[1fr_1.35fr]">
            {/* Left: How it works */}
            <div>
              <p className="eyebrow text-brass">The Listing Protocol</p>
              <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-ink">
                How we represent your property
              </h2>

              <div className="mt-8 space-y-6">
                {STEPS.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={s.title}
                      className="rounded-2xl border border-line bg-white p-5 shadow-sm flex items-start gap-4"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brass-ghost text-brass">
                        <Icon size={20} weight="duotone" />
                      </div>
                      <div>
                        <h3 className="font-display text-base font-bold text-ink">{s.title}</h3>
                        <p className="mt-1 text-xs text-muted leading-relaxed">{s.body}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 rounded-2xl bg-paper-2 border border-line p-6 text-xs text-muted leading-relaxed">
                <p className="font-bold text-ink mb-1">Zero Upfront Listing Fee</p>
                <p>Listing with SS Property is free of charge. We only succeed when your property is successfully closed with complete satisfaction.</p>
              </div>
            </div>

            {/* Right: 3-step luxury valuation wizard */}
            <div>
              <SellForm kind="sell" />
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </FooterSettingsContext.Provider>
  );
}
