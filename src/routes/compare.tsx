import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { FooterSettingsContext } from "../components/footer-settings";
import { getSupabaseForRoute } from "../lib/route-supabase";
import { getSiteSettings, listProperties } from "../lib/queries";
import type { Property } from "../lib/types";
import { useCompare } from "../lib/compare";
import { formatPrice } from "../lib/format";
import { SITE } from "../lib/site";
import { FloatingConcierge } from "../components/floating-concierge";
import {
  Scales,
  X,
  Plus,
  Check,
  WhatsappLogo,
  ArrowRight,
  ShieldCheck,
  Calculator,
  Compass,
} from "@phosphor-icons/react";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare Residences · Architectural Dossier · Apex Living" },
      {
        name: "description",
        content:
          "Side-by-side comparison of luxury residences. Compare super built-up areas, price per sq.ft., orientations, and transaction breakdowns.",
      },
      { property: "og:title", content: "Compare Residences · Apex Living" },
      {
        property: "og:description",
        content:
          "Side-by-side comparison of luxury residences. Compare super built-up areas, price per sq.ft., and transaction breakdowns.",
      },
      { property: "og:image", content: "/images/properties/luxury_penthouse_terrace_1790945979055.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Compare Residences · Apex Living" },
      { name: "twitter:image", content: "/images/properties/luxury_penthouse_terrace_1790945979055.jpg" },
    ],
  }),
  loader: async () => {
    const supabase = getSupabaseForRoute();
    const [allProperties, settings] = await Promise.all([
      listProperties(supabase, { limit: 50 }),
      getSiteSettings(supabase),
    ]);
    return { allProperties, settings };
  },
  component: ComparePage,
});

const ALL_AMENITIES = [
  "Lift",
  "24/7 Security",
  "Covered Parking",
  "Modular Kitchen",
  "Wardrobes",
  "ACs",
  "Geysers",
  "Power Backup",
  "Gymnasium",
  "Community Hall",
  "Water Filtration",
];

function ComparePage() {
  const { allProperties, settings } = Route.useLoaderData();
  const { items, removeItem, clear, toggle, isCompared } = useCompare();
  const [showAddPicker, setShowAddPicker] = useState(false);

  // Match compare items with full property data
  const comparedProperties = useMemo(() => {
    return items
      .map((item) => allProperties.find((p: Property) => p.id === item.id))
      .filter((p): p is Property => p !== undefined);
  }, [items, allProperties]);

  // West Bengal tax calculator helper
  const calculateWbTax = (price: number | null) => {
    if (!price) return { stampDuty: 0, regFee: 0, total: 0 };
    const stampRate = price > 1e7 ? 0.07 : 0.06;
    const stampDuty = Math.round(price * stampRate);
    const regFee = Math.round(price * 0.01);
    return { stampDuty, regFee, total: stampDuty + regFee };
  };

  return (
    <FooterSettingsContext.Provider value={settings}>
      <div className="min-h-dvh bg-paper text-ink selection:bg-brass-ghost">
        <Header />
        {/* Hero Header */}
        <section className="relative border-b border-line bg-gradient-to-b from-paper-2 to-paper pt-20 lg:pt-28 pb-10 sm:pb-12">
        <div className="shell-wide">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-brass/40 bg-brass/10 px-3.5 py-1 text-xs font-semibold text-brass-dark">
                <Scales size={14} weight="fill" className="text-brass" />
                <span>Side-by-Side Architectural Dossier</span>
              </div>
              <h1 className="mt-4 font-display text-3xl md:text-5xl font-medium tracking-tight text-ink">
                Residences Comparison Matrix
              </h1>
              <p className="mt-3 max-w-2xl text-xs md:text-sm text-muted leading-relaxed">
                Directly evaluate Kolkata luxury homes across super built-up space, price per square foot, Vastu facing, executive amenities, and West Bengal municipal stamp duty.
              </p>
            </div>

            {comparedProperties.length > 0 && (
              <div className="flex items-center gap-3 shrink-0">
                {comparedProperties.length < 4 && (
                  <button
                    type="button"
                    onClick={() => setShowAddPicker(true)}
                    className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink hover:border-brass transition-colors shadow-sm"
                  >
                    <Plus size={14} weight="bold" />
                    <span>Add Residence ({comparedProperties.length}/4)</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={clear}
                  className="flex items-center gap-1.5 rounded-full border border-danger/30 bg-danger/5 px-4 py-2.5 text-xs font-semibold text-danger hover:bg-danger/15 transition-colors"
                >
                  <X size={14} />
                  <span>Clear All</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Comparison Table */}
      <main className="shell-wide py-12">
        {comparedProperties.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center rounded-3xl border border-line bg-white p-12 md:p-20 text-center shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-paper-2 text-brass">
              <Scales size={32} weight="duotone" />
            </div>
            <h3 className="mt-6 font-display text-2xl font-medium text-ink">
              No Residences Selected for Comparison
            </h3>
            <p className="mt-2 max-w-md text-xs md:text-sm text-muted leading-relaxed">
              Explore our verified properties in Ballygunge, Alipore, New Town, and Salt Lake. Click the <strong>Compare</strong> button on any card to view specs side-by-side.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/properties"
                className="flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-xs font-bold uppercase tracking-wider text-paper shadow-md hover:bg-ink-2 transition-all"
              >
                <span>Browse All Residences</span>
                <ArrowRight size={14} weight="bold" />
              </Link>
            </div>
          </div>
        ) : (
          /* Detailed Comparison Matrix */
          <div>
            {/* Mobile swipe hint */}
            <div className="flex items-center justify-between pb-3 sm:hidden text-xs text-muted">
              <span className="flex items-center gap-1.5 font-medium text-brass">
                <span>←</span> Swipe horizontally to compare residences <span>→</span>
              </span>
              <span className="text-[11px] font-bold text-ink">{comparedProperties.length} Selected</span>
            </div>

            <div className="overflow-x-auto rounded-2xl sm:rounded-3xl border border-line bg-white shadow-sm scroll-rail">
              <table className="w-full text-left border-collapse min-w-[640px] sm:min-w-[700px]">
                {/* Header: Property Covers & Titles */}
                <thead>
                  <tr className="border-b border-line bg-paper-2/40">
                    <th className="sticky left-0 bg-paper-2/95 backdrop-blur-md z-20 p-4 sm:p-6 w-36 sm:w-48 text-xs font-bold uppercase tracking-wider text-muted align-top shadow-[2px_0_6px_rgba(0,0,0,0.04)]">
                      Residence Spec
                    </th>
                    {comparedProperties.map((p) => (
                      <th key={p.id} className="p-4 sm:p-6 w-64 sm:w-72 align-top border-l border-line">
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => removeItem(p.id)}
                            aria-label={`Remove ${p.title}`}
                            className="absolute -top-2 -right-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-ink/80 text-paper hover:bg-danger transition-colors shadow-md active:scale-90"
                          >
                            <X size={13} weight="bold" />
                          </button>
                          <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-paper-2">
                            <img
                              src={p.main_image_thumb || p.main_image}
                              alt={p.title}
                              onError={(e) => {
                                e.currentTarget.src = "/images/og-banner.jpg";
                              }}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span className="mt-3 block text-[11px] font-bold uppercase tracking-wider text-brass">
                            {p.locality}
                          </span>
                          <Link
                            to="/property/$slug"
                            params={{ slug: p.slug }}
                            className="font-display text-base font-bold text-ink hover:text-brass transition-colors line-clamp-2 mt-1"
                          >
                            {p.title}
                          </Link>
                          <p className="mt-2 font-display text-xl font-bold text-ink">
                            {formatPrice(p.price_inr, p.price_display)}
                          </p>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-line/60 text-xs">
                  {/* Price / Sq.Ft */}
                  <tr className="hover:bg-paper-2/30 transition-colors">
                    <td className="sticky left-0 bg-white z-10 p-4 sm:p-5 font-semibold text-ink shadow-[2px_0_6px_rgba(0,0,0,0.04)] whitespace-nowrap">Price / Sq.Ft</td>
                    {comparedProperties.map((p) => {
                      const rate =
                        p.price_inr && p.area_sqft ? Math.round(p.price_inr / p.area_sqft) : null;
                      return (
                        <td key={p.id} className="p-4 sm:p-5 border-l border-line">
                          <span className="font-bold text-ink text-sm">
                            {rate ? `₹${rate.toLocaleString("en-IN")}` : "N/A"}
                          </span>
                          <span className="block text-[11px] text-muted">All-inclusive rate</span>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Configuration */}
                  <tr className="hover:bg-paper-2/30 transition-colors">
                    <td className="sticky left-0 bg-white z-10 p-4 sm:p-5 font-semibold text-ink shadow-[2px_0_6px_rgba(0,0,0,0.04)] whitespace-nowrap">Configuration</td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="p-4 sm:p-5 border-l border-line font-bold text-ink">
                        {p.bhk_type}
                      </td>
                    ))}
                  </tr>

                  {/* Super Built-Up Area */}
                  <tr className="hover:bg-paper-2/30 transition-colors">
                    <td className="sticky left-0 bg-white z-10 p-4 sm:p-5 font-semibold text-ink shadow-[2px_0_6px_rgba(0,0,0,0.04)] whitespace-nowrap">Super Built-Up Area</td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="p-4 sm:p-5 border-l border-line">
                        <span className="font-bold text-ink text-sm">
                          {p.area_sqft ? `${p.area_sqft.toLocaleString("en-IN")} sq.ft` : "N/A"}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Bathrooms & Balconies */}
                  <tr className="hover:bg-paper-2/30 transition-colors">
                    <td className="sticky left-0 bg-white z-10 p-4 sm:p-5 font-semibold text-ink shadow-[2px_0_6px_rgba(0,0,0,0.04)] whitespace-nowrap">Baths & Balconies</td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="p-4 sm:p-5 border-l border-line text-muted">
                        <span className="font-semibold text-ink">{p.bathrooms || 2} Bathrooms</span>
                        {p.balconies ? <span> • {p.balconies} Balcony</span> : null}
                      </td>
                    ))}
                  </tr>

                  {/* Floor / Height */}
                  <tr className="hover:bg-paper-2/30 transition-colors">
                    <td className="sticky left-0 bg-white z-10 p-4 sm:p-5 font-semibold text-ink shadow-[2px_0_6px_rgba(0,0,0,0.04)] whitespace-nowrap">Floor Level</td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="p-4 sm:p-5 border-l border-line font-medium text-ink">
                        {p.floor || "Mid Floor"}
                      </td>
                    ))}
                  </tr>

                  {/* Vastu / Facing */}
                  <tr className="hover:bg-paper-2/30 transition-colors">
                    <td className="sticky left-0 bg-white z-10 p-4 sm:p-5 font-semibold text-ink shadow-[2px_0_6px_rgba(0,0,0,0.04)] whitespace-nowrap">Direction Facing</td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="p-4 sm:p-5 border-l border-line font-medium text-ink">
                        <span className="inline-flex items-center gap-1 rounded-md bg-paper-2 px-2.5 py-1 text-xs">
                          <Compass size={13} className="text-brass" />
                          {p.facing || "Vastu Compliant"}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Parking */}
                  <tr className="hover:bg-paper-2/30 transition-colors">
                    <td className="sticky left-0 bg-white z-10 p-4 sm:p-5 font-semibold text-ink shadow-[2px_0_6px_rgba(0,0,0,0.04)] whitespace-nowrap">Parking Allotted</td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="p-4 sm:p-5 border-l border-line text-muted">
                        {p.parking || "Covered Parking"}
                      </td>
                    ))}
                  </tr>

                  {/* Possession Status */}
                  <tr className="hover:bg-paper-2/30 transition-colors">
                    <td className="sticky left-0 bg-white z-10 p-4 sm:p-5 font-semibold text-ink shadow-[2px_0_6px_rgba(0,0,0,0.04)] whitespace-nowrap">Possession Timeline</td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="p-4 sm:p-5 border-l border-line">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                            p.possession_status === "Ready To Move"
                              ? "bg-verdigris text-white"
                              : "bg-paper-2 text-ink"
                          }`}
                        >
                          {p.possession_status}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Furnishing Status */}
                  <tr className="hover:bg-paper-2/30 transition-colors">
                    <td className="sticky left-0 bg-white z-10 p-4 sm:p-5 font-semibold text-ink shadow-[2px_0_6px_rgba(0,0,0,0.04)] whitespace-nowrap">Furnishing Level</td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="p-4 sm:p-5 border-l border-line font-medium text-ink">
                        {p.furnishing_status}
                      </td>
                    ))}
                  </tr>

                  {/* West Bengal Stamp Duty & Registration */}
                  <tr className="bg-brass/5 hover:bg-brass/10 transition-colors">
                    <td className="sticky left-0 bg-white z-10 p-4 sm:p-5 font-semibold text-ink shadow-[2px_0_6px_rgba(0,0,0,0.04)]">
                      <span className="flex items-center gap-1.5 text-brass-dark">
                        <Calculator size={16} />
                        WB Stamp Duty & Reg. Est.
                      </span>
                      <span className="block text-[10px] text-muted mt-0.5">
                        KMC municipal guidance
                      </span>
                    </td>
                    {comparedProperties.map((p) => {
                      const wb = calculateWbTax(p.price_inr);
                      return (
                        <td key={p.id} className="p-4 sm:p-5 border-l border-line">
                          <span className="font-display text-sm font-bold text-ink">
                            ₹{wb.total.toLocaleString("en-IN")}
                          </span>
                          <div className="text-[10px] text-muted space-y-0.5 mt-1">
                            <p>Stamp Duty: ₹{wb.stampDuty.toLocaleString("en-IN")}</p>
                            <p>Registration (1%): ₹{wb.regFee.toLocaleString("en-IN")}</p>
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Title Verification */}
                  <tr className="hover:bg-paper-2/30 transition-colors">
                    <td className="sticky left-0 bg-white z-10 p-4 sm:p-5 font-semibold text-ink shadow-[2px_0_6px_rgba(0,0,0,0.04)] whitespace-nowrap">Title & Legal Status</td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="p-4 sm:p-5 border-l border-line">
                        <span className="inline-flex items-center gap-1 text-verdigris font-semibold">
                          <ShieldCheck size={16} weight="fill" />
                          100% Freehold Verified
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Amenities Matrix */}
                  {ALL_AMENITIES.map((amenity) => (
                    <tr key={amenity} className="hover:bg-paper-2/30 transition-colors">
                      <td className="sticky left-0 bg-white z-10 p-3 sm:p-4 text-muted font-medium pl-4 sm:pl-6 shadow-[2px_0_6px_rgba(0,0,0,0.04)] whitespace-nowrap">{amenity}</td>
                      {comparedProperties.map((p) => {
                        const has = (p.amenities || []).some(
                          (a) => a.toLowerCase().includes(amenity.toLowerCase())
                        );
                        return (
                          <td key={p.id} className="p-3 sm:p-4 border-l border-line text-center">
                            {has ? (
                              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-verdigris/15 text-verdigris">
                                <Check size={14} weight="bold" />
                              </span>
                            ) : (
                              <span className="inline-block text-muted/40 font-mono text-xs">-</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}

                  {/* Action Row */}
                  <tr className="bg-paper-2/60">
                    <td className="sticky left-0 bg-paper-2/95 z-10 p-4 sm:p-6 font-bold uppercase tracking-wider text-xs text-ink shadow-[2px_0_6px_rgba(0,0,0,0.04)]">
                      Actions
                    </td>
                    {comparedProperties.map((p) => {
                      const waText = encodeURIComponent(
                        `Hello, I am comparing "${p.title}" (${p.locality}, priced at ${formatPrice(p.price_inr, p.price_display)}). Please share the complete inspection dossier and schedule a site visit.`
                      );
                      return (
                        <td key={p.id} className="p-4 sm:p-6 border-l border-line space-y-2.5">
                          <a
                            href={`${SITE.whatsapp}?text=${waText}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center gap-2 rounded-full bg-verdigris px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-verdigris/90 transition-colors w-full min-h-[44px]"
                          >
                            <WhatsappLogo size={15} weight="fill" />
                            <span>Inquire WhatsApp</span>
                          </a>

                          <Link
                            to="/property/$slug"
                            params={{ slug: p.slug }}
                            className="flex items-center justify-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-xs font-semibold text-paper hover:bg-ink-2 transition-colors w-full min-h-[44px]"
                          >
                            <span>Full Specs</span>
                            <ArrowRight size={13} weight="bold" />
                          </Link>
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Add Property Quick Modal */}
      {showAddPicker && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink/70 p-0 sm:p-4 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          onClick={() => setShowAddPicker(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl max-h-[85dvh] overflow-hidden rounded-t-3xl sm:rounded-3xl border border-line bg-white shadow-2xl flex flex-col animate-in slide-in-from-bottom-6 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-200"
            style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
          >
            <div className="flex items-center justify-between border-b border-line p-4 sm:p-5">
              <div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-ink">
                  Add Residence to Compare
                </h3>
                <p className="text-xs text-muted">Select up to 4 properties for side-by-side spec comparison</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddPicker(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-paper-2 text-muted hover:text-ink transition-colors cursor-pointer active:scale-90"
              >
                <X size={18} />
              </button>
            </div>

            <div className="overflow-y-auto p-4 sm:p-5 divide-y divide-line">
              {allProperties.map((p: Property) => {
                const compared = isCompared(p.id);
                return (
                  <div
                    key={p.id}
                    className="flex items-center justify-between py-3 gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={p.main_image_thumb || p.main_image}
                        alt={p.title}
                        onError={(e) => {
                          e.currentTarget.src = "/images/og-banner.jpg";
                        }}
                        className="h-12 w-12 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-ink">{p.title}</p>
                        <p className="text-[11px] text-muted">
                          {p.locality} • {p.bhk_type} • {formatPrice(p.price_inr, p.price_display)}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={compared || comparedProperties.length >= 4}
                      onClick={() => {
                        toggle(p);
                        setShowAddPicker(false);
                      }}
                      className={`min-h-[40px] rounded-full px-4 py-2 text-xs font-semibold transition-all shrink-0 active:scale-95 ${
                        compared
                          ? "bg-paper-2 text-muted cursor-not-allowed"
                          : "bg-ink text-paper hover:bg-ink-2"
                      }`}
                    >
                      {compared ? "Added" : "+ Compare"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <FloatingConcierge />
      <Footer />
    </div>
  </FooterSettingsContext.Provider>
  );
}
