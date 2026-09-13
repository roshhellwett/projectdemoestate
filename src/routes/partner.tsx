import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { FooterSettingsContext } from "../components/footer-settings";
import { FloatingConcierge } from "../components/floating-concierge";
import { SellForm } from "../components/sell-form";
import { PartnerWall } from "../components/sections";
import { initRevealOnScroll } from "../lib/reveal";
import { getSupabaseForRoute } from "../lib/route-supabase";
import { getSiteSettings, listPartners } from "../lib/queries";

export const Route = createFileRoute("/partner")({
  loader: async () => {
    const supabase = getSupabaseForRoute();
    const [partners, settings] = await Promise.all([listPartners(supabase), getSiteSettings(supabase)]);
    return { partners, settings };
  },
  head: () => ({
    meta: [
      { title: "Partner With Us · SS Property" },
      { name: "description", content: "Developers, interior brands and financial services - reach Kolkata's qualified property buyers." },
    ],
  }),
  component: PartnerPage,
});

const PARTNERS = [
  {
    title: "Real estate developers",
    body: "Showcase upcoming projects to thousands of qualified buyers and investors across Kolkata.",
  },
  {
    title: "Interior and home brands",
    body: "Reach new homeowners and design-minded buyers through our engaged community.",
  },
  {
    title: "Financial services",
    body: "Connect with homebuyers actively looking for financing and mortgage solutions.",
  },
];

function PartnerPage() {
  const { partners, settings } = Route.useLoaderData();

  useEffect(() => {
    initRevealOnScroll();
  }, []);

  return (
    <div className="min-h-dvh">
      <Header />
      <FloatingConcierge />
      <main className="pt-16">
        <section className="border-b border-line bg-paper-2/60">
          <div className="shell py-14 md:py-20">
            <p className="eyebrow">Partnerships</p>
            <h1 className="mt-4 max-w-2xl font-display text-4xl font-medium leading-tight tracking-tight text-ink md:text-5xl">
              Put your brand where Kolkata's buyers are looking.
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
              {settings.partner_intro ??
                "Developers, interior brands and financial services - reach Kolkata's qualified property buyers."}
            </p>
          </div>
        </section>

        <section className="shell-wide py-14">
          <div className="grid gap-6 md:grid-cols-3">
            {PARTNERS.map((p) => (
              <div key={p.title} className="reveal rounded-[var(--radius-card)] border border-line bg-white p-7">
                <h2 className="font-display text-xl font-medium text-ink">{p.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <PartnerWall partners={partners} />

        <section className="shell max-w-3xl py-20">
          <div className="rounded-[var(--radius-card)] border border-line bg-paper-2/50 p-6 md:p-10">
            <h2 className="font-display text-2xl font-medium tracking-tight text-ink">Get in touch</h2>
            <p className="mt-1 text-sm text-muted">Tell us about your proposal and we will reach out.</p>
            <div className="mt-8">
              <SellForm kind="partner" />
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
