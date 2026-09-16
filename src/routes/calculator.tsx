import { createFileRoute } from "@tanstack/react-router";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { FooterSettingsContext } from "../components/footer-settings";
import { FloatingConcierge } from "../components/floating-concierge";
import { EmiCalculator } from "../components/emi-calculator";
import { getSupabaseForRoute } from "../lib/route-supabase";
import { getSiteSettings } from "../lib/queries";
import {
  Calculator,
  ShieldCheck,
  Bank,
  CurrencyInr,
  WhatsappLogo,
} from "@phosphor-icons/react";
import { SITE } from "../lib/site";

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { title: "Kolkata Home Loan EMI & West Bengal Stamp Duty Calculator · SS Property" },
      {
        name: "description",
        content:
          "Calculate monthly home loan EMIs, West Bengal municipal stamp duty, and registration charges for residential and commercial properties in Kolkata.",
      },
      { property: "og:title", content: "Kolkata Home Loan EMI & West Bengal Stamp Duty Calculator · SS Property" },
      {
        property: "og:description",
        content:
          "Calculate monthly home loan EMIs, West Bengal municipal stamp duty, and registration charges for properties in Kolkata.",
      },
      { property: "og:image", content: "/images/og-banner.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Kolkata Home Loan EMI & Stamp Duty Calculator · SS Property" },
      { name: "twitter:image", content: "/images/og-banner.jpg" },
    ],
  }),
  loader: async () => {
    const supabase = getSupabaseForRoute();
    const settings = await getSiteSettings(supabase);
    return { settings };
  },
  component: CalculatorPage,
});

function CalculatorPage() {
  const { settings } = Route.useLoaderData();

  return (
    <FooterSettingsContext.Provider value={settings}>
      <div className="min-h-dvh bg-paper text-ink selection:bg-brass-ghost">
        <Header />
        <FloatingConcierge />

        <main className="pt-14 lg:pt-20">
          {/* =================================================================
              PAGE BANNER
             ================================================================= */}
          <section className="border-b border-line bg-paper-2/70 py-14 md:py-20">
            <div className="shell max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-brass/40 bg-white px-3.5 py-1 text-xs font-semibold text-ink shadow-sm">
                <Calculator size={14} weight="fill" className="text-brass" />
                <span>Financial Transparency</span>
              </div>
              <h1 className="mt-4 font-display text-4xl md:text-5xl font-medium tracking-tight text-ink">
                Kolkata Real Estate Financial Planner
              </h1>
              <p className="mt-4 text-sm md:text-base text-muted max-w-2xl mx-auto leading-relaxed">
                Estimate your monthly repayments, loan eligibility, and West Bengal municipal stamp duty & registration charges with complete accuracy.
              </p>
            </div>
          </section>

          {/* =================================================================
              MAIN CALCULATOR WIDGET
             ================================================================= */}
          <section className="shell py-14 md:py-20">
            <EmiCalculator initialPrice={12000000} title="Comprehensive Kolkata Property Loan & Tax Calculator" />
          </section>

          {/* =================================================================
              WEST BENGAL REAL ESTATE TAXATION & STAMP DUTY GUIDE
             ================================================================= */}
          <section className="border-t border-line bg-paper-2/60 py-16 md:py-24">
            <div className="shell max-w-5xl">
              <div className="text-center max-w-2xl mx-auto mb-14">
                <p className="eyebrow text-brass">Government Regulation</p>
                <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-ink">
                  Understanding West Bengal Property Registration
                </h2>
                <p className="mt-3 text-xs text-muted">
                  Legal breakdown of registration rates across Kolkata Municipal Corporation (KMC) and Bidhannagar / Newtown development authorities.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brass-ghost text-brass">
                    <CurrencyInr size={20} weight="bold" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-ink">Stamp Duty Rates</h3>
                  <p className="mt-2 text-xs text-muted leading-relaxed">
                    Under Kolkata Municipal Corporation (KMC) jurisdiction: <strong>6%</strong> for properties valued up to ₹1 Crore, and <strong>7%</strong> for properties exceeding ₹1 Crore.
                  </p>
                </div>

                <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brass-ghost text-brass">
                    <ShieldCheck size={20} weight="bold" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-ink">Registration Fee</h3>
                  <p className="mt-2 text-xs text-muted leading-relaxed">
                    A flat <strong>1%</strong> registration fee applies on the total market deed value, paid directly to the Directorate of Registration and Stamp Revenue, West Bengal.
                  </p>
                </div>

                <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brass-ghost text-brass">
                    <Bank size={20} weight="bold" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-ink">Bank Loan Pre-Approval</h3>
                  <p className="mt-2 text-xs text-muted leading-relaxed">
                    Nationalized & private banks (SBI, HDFC, ICICI, Axis) typically finance between <strong>75% to 80%</strong> of the total agreement value for salaried and business applicants.
                  </p>
                </div>
              </div>

              {/* Consultation Banner */}
              <div className="mt-12 rounded-3xl border border-line bg-ink text-paper p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="font-display text-2xl font-medium text-paper">Need guidance with bank loans or deed valuation?</h4>
                  <p className="mt-1 text-xs text-paper/70">Our in-house legal and banking advisors assist buyers throughout the loan sanctions and registration process.</p>
                </div>
                <a
                  href={`${SITE.whatsapp}?text=${encodeURIComponent("Hello SS Property, I need assistance with home loan eligibility and property registration costs in Kolkata.")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full bg-brass px-6 py-3 text-xs font-bold uppercase tracking-wider text-ink shrink-0 hover:bg-brass-2 transition-colors"
                >
                  <WhatsappLogo size={16} weight="fill" />
                  <span>Free Financial Consultation</span>
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </FooterSettingsContext.Provider>
  );
}
