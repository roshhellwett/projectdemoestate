import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { FooterSettingsContext } from "../components/footer-settings";
import { PropertyCard } from "../components/property-card";
import { FloatingConcierge } from "../components/floating-concierge";
import { CompareDrawer } from "../components/compare-drawer";
import { EmiCalculator } from "../components/emi-calculator";
import { EnquiryForm } from "../components/enquiry-form";
import { VastuSolarDial } from "../components/vastu-solar-dial";
import { TransitCorridorMatrix } from "../components/transit-corridor-matrix";
import { InvestmentModeler } from "../components/investment-modeler";
import { useFavorites } from "../lib/favorites";
import { useCompare } from "../lib/compare";
import { initRevealOnScroll } from "../lib/reveal";
import { getSupabaseForRoute } from "../lib/route-supabase";
import {
  getImagesForProperty,
  getPropertyBySlug,
  getSimilarProperties,
  getSiteSettings,
} from "../lib/queries";
import { formatArea, formatPrice } from "../lib/format";
import { SITE } from "../lib/site";
import {
  MapPin,
  Heart,
  ShareNetwork,
  Printer,
  CheckCircle,
  WhatsappLogo,
  CalendarCheck,
  House,
  Bathtub,
  Compass,
  Car,
  ArrowsOut,
  Sparkle,
  X,
  CaretLeft,
  CaretRight,
  PlayCircle,
  ShieldCheck,
  Building,
  Scales,
} from "@phosphor-icons/react";

export const Route = createFileRoute("/property/$slug")({
  loader: async ({ params }) => {
    const supabase = getSupabaseForRoute();
    const property = await getPropertyBySlug(supabase, params.slug);
    if (!property) throw notFound();
    const [images, similar, settings] = await Promise.all([
      getImagesForProperty(supabase, property.id),
      getSimilarProperties(supabase, property, 3),
      getSiteSettings(supabase),
    ]);
    return { property, images, similar, settings };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.property;
    const desc = p
      ? `${p.bhk_type} in ${p.locality || p.location}. ${formatPrice(p.price_inr, p.price_display)}. 100% physically inspected & title verified by SS Property Kolkata.`
      : "Verified luxury property in Kolkata by SS Property.";
    const img = p?.main_image || "/images/og-banner.jpg";
    return {
      meta: p
        ? [
            { title: `${p.title} · SS Property Kolkata` },
            { name: "description", content: desc },
            { property: "og:title", content: `${p.title} · SS Property Kolkata` },
            { property: "og:description", content: desc },
            { property: "og:image", content: img },
            { property: "og:type", content: "article" },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:title", content: `${p.title} · SS Property Kolkata` },
            { name: "twitter:description", content: desc },
            { name: "twitter:image", content: img },
          ]
        : [],
    };
  },
  component: PropertyDetailPage,
});

function PropertyDetailPage() {
  const { property, images, similar, settings } = Route.useLoaderData();
  const { isFavorite, toggle } = useFavorites();
  const favorited = isFavorite(property.id);
  const { isCompared, toggle: toggleCompare } = useCompare();
  const compared = isCompared(property.id);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  useEffect(() => {
    initRevealOnScroll();
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Combined gallery array: main image first, then gallery photos
  const gallery = [property.main_image, ...images.map((i) => i.image_url)].filter(Boolean);

  const pricePerSqFt =
    property.price_inr && property.area_sqft && property.area_sqft > 0
      ? Math.round(property.price_inr / property.area_sqft)
      : null;

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: `Check out this verified property in ${property.locality} on SS Property:`,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  const whatsappInquiryUrl = `${SITE.whatsapp}?text=${encodeURIComponent(
    `Hello SS Property, I am interested in scheduling a private site visit for "${property.title}" in ${property.locality} (Priced at ${formatPrice(property.price_inr, property.price_display)}). Please share verified details.`
  )}`;

  return (
    <FooterSettingsContext.Provider value={settings}>
      <div className="min-h-dvh bg-paper text-ink selection:bg-brass-ghost pb-20 md:pb-0">
        <Header />

        {/* =================================================================
            STICKY SUB-HEADER ON SCROLL
           ================================================================= */}
        <div
          className={`fixed top-14 lg:top-20 inset-x-0 z-30 border-b border-line bg-white/95 backdrop-blur-md shadow-sm transition-all duration-300 no-print ${
            showStickyBar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
          }`}
        >
          <div className="shell-wide flex h-14 items-center justify-between gap-4">
            <div className="flex items-center gap-3 overflow-hidden">
              <img
                src={property.main_image_thumb || property.main_image}
                alt={property.title}
                className="h-10 w-10 shrink-0 rounded-lg object-cover"
              />
              <div className="truncate">
                <p className="truncate text-xs font-bold text-ink">{property.title}</p>
                <p className="text-[11px] text-muted">{property.locality}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right hidden sm:block">
                <span className="font-display text-lg font-bold text-ink">
                  {formatPrice(property.price_inr, property.price_display)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => toggleCompare(property)}
                className={`hidden md:flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors ${
                  compared
                    ? "border-brass bg-brass text-ink font-bold"
                    : "border-line bg-paper text-ink hover:border-brass"
                }`}
              >
                <Scales size={15} weight={compared ? "fill" : "regular"} />
                <span>{compared ? "Compared" : "Compare"}</span>
              </button>
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-full bg-verdigris px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-verdigris/90 cursor-pointer min-h-[44px]"
              >
                <WhatsappLogo size={15} weight="fill" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
              <a
                href="#enquiry-section"
                className="rounded-full bg-ink px-4 py-2.5 text-xs font-semibold text-paper hover:bg-ink-2 cursor-pointer min-h-[44px] flex items-center"
              >
                Schedule Visit
              </a>
            </div>
          </div>
        </div>

        <main className="pt-14 lg:pt-20">
          {/* =================================================================
              BREADCRUMB & TOP ACTIONS
             ================================================================= */}
          <nav className="shell-wide pt-6 pb-2 text-xs text-muted flex items-center justify-between gap-2 no-print" aria-label="Breadcrumb">
            <div className="min-w-0 flex-1 flex items-center gap-1.5 sm:gap-2 text-xs text-muted whitespace-nowrap overflow-hidden mr-2">
              <Link to="/" className="shrink-0 hover:text-ink transition-colors">Home</Link>
              <span className="shrink-0 text-muted/50">/</span>
              <Link to="/properties" className="shrink-0 hover:text-ink transition-colors">Properties</Link>
              <span className="shrink-0 text-muted/50">/</span>
              <span className="text-ink font-semibold truncate">{property.locality}</span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                type="button"
                onClick={() => toggleCompare(property)}
                className={`flex h-9 w-9 sm:h-auto sm:w-auto items-center justify-center sm:justify-start gap-1.5 rounded-full border sm:px-3 sm:py-1.5 text-xs font-semibold transition-colors ${
                  compared
                    ? "border-brass bg-brass/15 text-brass-dark font-bold"
                    : "border-line bg-white text-ink hover:border-brass"
                }`}
                title="Compare specifications"
                aria-label={compared ? "Remove from compare" : "Compare specifications"}
              >
                <Scales
                  size={15}
                  weight={compared ? "fill" : "regular"}
                  className={compared ? "text-brass" : "text-muted"}
                />
                <span className="hidden sm:inline">{compared ? "Compared" : "Compare"}</span>
              </button>

              <button
                type="button"
                onClick={() => toggle(property.id)}
                className="flex h-9 w-9 sm:h-auto sm:w-auto items-center justify-center sm:justify-start gap-1.5 rounded-full border border-line bg-white sm:px-3 sm:py-1.5 text-xs font-semibold text-ink hover:border-brass transition-colors"
                title="Save property"
                aria-label={favorited ? "Remove from saved" : "Save property"}
              >
                <Heart
                  size={15}
                  weight={favorited ? "fill" : "regular"}
                  className={favorited ? "text-danger" : "text-muted"}
                />
                <span className="hidden sm:inline">{favorited ? "Saved" : "Save"}</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="flex h-9 w-9 sm:h-auto sm:w-auto items-center justify-center sm:justify-start gap-1.5 rounded-full border border-line bg-white sm:px-3 sm:py-1.5 text-xs font-semibold text-ink hover:border-brass transition-colors"
                title="Share property"
                aria-label="Share property link"
              >
                <ShareNetwork size={15} />
                <span className="hidden sm:inline">{copiedShare ? "Link Copied!" : "Share"}</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="hidden sm:flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-semibold text-ink hover:border-brass hover:text-brass-dark transition-colors shadow-xs"
                title="Print Architectural Dossier"
              >
                <Printer size={15} />
                <span>Executive Dossier (Print/PDF)</span>
              </button>
            </div>
          </nav>

          {/* =================================================================
              TITLE & PRICE HEADER
             ================================================================= */}
          <section className="shell-wide pt-4 pb-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="flex items-center gap-1 rounded-full bg-ink text-paper px-3 py-0.5 text-[11px] font-bold">
                    <CheckCircle size={13} weight="fill" className="text-verdigris" />
                    Verified RERA Title
                  </span>
                  {property.possession_status ? (
                    <span className="rounded-full bg-verdigris px-3 py-0.5 text-[11px] font-bold text-white">
                      {property.possession_status}
                    </span>
                  ) : null}
                  {property.category ? (
                    <span className="rounded-full border border-line bg-paper-2 px-3 py-0.5 text-[11px] font-semibold text-muted">
                      {property.category}
                    </span>
                  ) : null}
                </div>

                <h1 className="font-display text-3xl md:text-5xl font-medium tracking-tight text-ink">
                  {property.title}
                </h1>

                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
                  <MapPin size={16} weight="fill" className="text-brass" />
                  <span>{property.location}</span>
                </p>
              </div>

              <div className="text-left md:text-right shrink-0 border-t border-line/60 md:border-0 pt-4 md:pt-0">
                <p className="font-display text-3xl md:text-5xl font-bold text-ink">
                  {formatPrice(property.price_inr, property.price_display)}
                </p>
                {pricePerSqFt ? (
                  <p className="mt-1 text-xs font-semibold text-muted">
                    ₹{pricePerSqFt.toLocaleString("en-IN")} per sq.ft • All Inclusive Rate
                  </p>
                ) : null}
              </div>
            </div>
          </section>

          {/* =================================================================
              LUXURY 5-PHOTO HERO GRID
             ================================================================= */}
          <section className="shell-wide pb-12">
            <div className="relative grid grid-cols-1 md:grid-cols-4 gap-3 h-[420px] md:h-[520px] rounded-3xl overflow-hidden shadow-[0_20px_50px_-20px_rgba(18,16,14,0.22)]">
              {/* Main Left Photo (spans 2 cols) */}
              <div
                onClick={() => setLightboxIndex(0)}
                className="relative md:col-span-2 h-full cursor-pointer overflow-hidden group bg-paper-2"
              >
                <img
                  src={gallery[0]}
                  alt={property.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* 2 Companion Photos in Col 3 */}
              <div className="hidden md:grid grid-rows-2 gap-3 h-full">
                {gallery[1] ? (
                  <div
                    onClick={() => setLightboxIndex(1)}
                    className="relative h-full cursor-pointer overflow-hidden group bg-paper-2"
                  >
                    <img
                      src={gallery[1]}
                      alt="Property interior"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ) : (
                  <div className="bg-paper-2" />
                )}

                {gallery[2] ? (
                  <div
                    onClick={() => setLightboxIndex(2)}
                    className="relative h-full cursor-pointer overflow-hidden group bg-paper-2"
                  >
                    <img
                      src={gallery[2]}
                      alt="Property interior"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ) : (
                  <div className="bg-paper-2" />
                )}
              </div>

              {/* 2 Companion Photos in Col 4 */}
              <div className="hidden md:grid grid-rows-2 gap-3 h-full">
                {gallery[3] ? (
                  <div
                    onClick={() => setLightboxIndex(3)}
                    className="relative h-full cursor-pointer overflow-hidden group bg-paper-2"
                  >
                    <img
                      src={gallery[3]}
                      alt="Property interior"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ) : (
                  <div className="bg-paper-2" />
                )}

                {gallery[4] ? (
                  <div
                    onClick={() => setLightboxIndex(4)}
                    className="relative h-full cursor-pointer overflow-hidden group bg-paper-2"
                  >
                    <img
                      src={gallery[4]}
                      alt="Property interior"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ) : (
                  <div className="bg-paper-2" />
                )}
              </div>

              {/* Floating "View All Photos" Button */}
              <button
                id="btn-view-gallery"
                type="button"
                onClick={() => setLightboxIndex(0)}
                className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-xs font-bold text-ink shadow-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95"
              >
                <Sparkle size={15} weight="fill" className="text-brass" />
                <span>View All {gallery.length} Photos</span>
              </button>
            </div>
          </section>

          {/* =================================================================
              BODY SECTION: SPECS & ENQUIRY GRID
             ================================================================= */}
          <section className="shell-wide grid gap-12 pb-20 lg:grid-cols-[1.55fr_1fr]">
            {/* Left Column: Details, Specs, Landmarks, Amenities, EMI */}
            <div className="space-y-14">
              {/* About this home */}
              <div>
                <h2 className="font-display text-2xl font-medium tracking-tight text-ink">
                  About this residence
                </h2>
                <p className="mt-4 max-w-[65ch] whitespace-pre-line text-[15px] leading-relaxed text-muted">
                  {property.description}
                </p>
              </div>

              {/* Key Specifications Matrix */}
              <div>
                <h2 className="font-display text-2xl font-medium tracking-tight text-ink">
                  Executive Specifications
                </h2>

                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="rounded-2xl border border-line bg-white p-4 shadow-sm">
                    <p className="eyebrow flex items-center gap-1">
                      <House size={13} className="text-brass" /> Configuration
                    </p>
                    <p className="mt-2 font-display text-lg font-bold text-ink">{property.bhk_type}</p>
                  </div>

                  <div className="rounded-2xl border border-line bg-white p-4 shadow-sm">
                    <p className="eyebrow flex items-center gap-1">
                      <ArrowsOut size={13} className="text-brass" /> Super Built-up
                    </p>
                    <p className="mt-2 font-display text-lg font-bold text-ink">
                      {formatArea(property.area_sqft)}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-line bg-white p-4 shadow-sm">
                    <p className="eyebrow flex items-center gap-1">
                      <Bathtub size={13} className="text-brass" /> Bathrooms
                    </p>
                    <p className="mt-2 font-display text-lg font-bold text-ink">
                      {property.bathrooms ?? "-"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-line bg-white p-4 shadow-sm">
                    <p className="eyebrow flex items-center gap-1">
                      <Building size={13} className="text-brass" /> Floor
                    </p>
                    <p className="mt-2 font-display text-lg font-bold text-ink">{property.floor || "Standard"}</p>
                  </div>

                  <div className="rounded-2xl border border-line bg-white p-4 shadow-sm">
                    <p className="eyebrow flex items-center gap-1">
                      <Compass size={13} className="text-brass" /> Direction Facing
                    </p>
                    <p className="mt-2 font-display text-lg font-bold text-ink">{property.facing || "Vastu Compliant"}</p>
                  </div>

                  <div className="rounded-2xl border border-line bg-white p-4 shadow-sm">
                    <p className="eyebrow flex items-center gap-1">
                      <Car size={13} className="text-brass" /> Parking
                    </p>
                    <p className="mt-2 font-display text-lg font-bold text-ink">{property.parking || "Included"}</p>
                  </div>
                </div>
              </div>

              {/* Architectural Solar & Vastu Blueprint */}
              <VastuSolarDial
                facing={property.facing}
                locality={property.locality}
                floor={property.floor}
              />

              {/* Amenities Grid */}
              {property.amenities.length > 0 ? (
                <div>
                  <h2 className="font-display text-2xl font-medium tracking-tight text-ink">
                    Verified Amenities & Facilities
                  </h2>
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {property.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold text-ink shadow-sm"
                      >
                        <ShieldCheck size={15} weight="fill" className="text-verdigris" />
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Transit & Proximity Scorecard */}
              <TransitCorridorMatrix
                locality={property.locality}
                landmarks={property.landmarks}
              />

              {/* Video Tour Banner (if Instagram URL exists) */}
              {property.instagram_url ? (
                <div className="rounded-2xl border border-line bg-paper-2 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brass-ghost text-brass">
                      <PlayCircle size={28} weight="duotone" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-ink">Watch Live Video Tour</h3>
                      <p className="text-xs text-muted">Walkthrough reel recorded on location by SS Property</p>
                    </div>
                  </div>
                  <a
                    href={property.instagram_url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-ink px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-paper hover:bg-ink-2 shrink-0"
                  >
                    Open Instagram Tour
                  </a>
                </div>
              ) : null}

              {/* Institutional Investment ROI & Capital Growth Modeler */}
              <InvestmentModeler
                priceInr={property.price_inr ?? 8500000}
                locality={property.locality}
                bhkType={property.bhk_type}
                areaSqFt={property.area_sqft}
              />

              {/* Real-time EMI & Loan Calculator (pre-filled with this property's price!) */}
              <div>
                <EmiCalculator
                  initialPrice={property.price_inr ?? 8500000}
                  title={`Financing Calculator for ${property.title}`}
                />
              </div>
            </div>

            {/* Right Column: Schedule Private Tour & WhatsApp Direct Lead Box */}
            <div className="lg:pl-4">
              <div id="enquiry-section" className="sticky top-28 space-y-6">
                {/* VIP Visit Scheduler */}
                <div className="rounded-3xl border border-line bg-white p-7 shadow-lg">
                  <div className="flex items-center gap-3 border-b border-line/60 pb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-verdigris-soft text-verdigris">
                      <CalendarCheck size={22} weight="duotone" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-ink">Schedule a Private Tour</h3>
                      <p className="text-xs text-muted">Direct with verified SS Property advisor</p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <EnquiryForm property={property} />
                  </div>

                  <div className="mt-6 border-t border-line/60 pt-4">
                    <p className="text-center text-xs text-muted mb-3">Prefer immediate conversation?</p>
                    <a
                      href={whatsappInquiryUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-verdigris py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-verdigris/90 transition-colors"
                    >
                      <WhatsappLogo size={18} weight="fill" />
                      <span>Instant WhatsApp Chat</span>
                    </a>
                  </div>
                </div>

                {/* Trust Card */}
                <div className="rounded-2xl border border-line bg-paper-2 p-5 text-xs text-muted space-y-2">
                  <p className="font-bold text-ink flex items-center gap-1.5">
                    <ShieldCheck size={16} weight="fill" className="text-verdigris" />
                    100% Verified by SS Property
                  </p>
                  <p>All listings are walked through in person. Title search, sanction plans, and developer credentials verified before listing.</p>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================================
              SIMILAR RESIDENCES SECTION
             ================================================================= */}
          {similar.length > 0 ? (
            <section className="shell-wide py-20 border-t border-line">
              <h2 className="font-display text-3xl font-medium tracking-tight text-ink">
                Similar residences in {property.locality}
              </h2>
              <p className="mt-2 text-xs text-muted">Carefully matched by location, bedroom layout and budget</p>

              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {similar.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </section>
          ) : null}
        </main>

        {/* =================================================================
            FULLSCREEN LIGHTBOX MODAL
           ================================================================= */}
        {lightboxIndex !== null ? (
          <div
            id="lightbox-modal"
            className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 text-white backdrop-blur-xl animate-in fade-in duration-200"
            role="dialog"
            aria-label="Gallery lightbox"
          >
            {/* Top Lightbox Bar */}
            <div className="flex items-center justify-between p-6">
              <span className="font-mono text-xs text-white/70">
                Photo {lightboxIndex + 1} of {gallery.length}
              </span>
              <button
                id="btn-close-lightbox"
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close lightbox"
                className="rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Central Photo with Left/Right Arrows */}
            <div className="relative flex flex-1 items-center justify-center px-4 md:px-16 overflow-hidden">
              <button
                id="btn-prev-photo"
                type="button"
                onClick={() =>
                  setLightboxIndex((prev) =>
                    prev !== null ? (prev - 1 + gallery.length) % gallery.length : 0
                  )
                }
                aria-label="Previous photo"
                className="absolute left-6 z-10 rounded-full bg-white/15 p-3 text-white backdrop-blur-md hover:bg-white/30 transition-transform active:scale-95"
              >
                <CaretLeft size={24} weight="bold" />
              </button>

              <img
                src={gallery[lightboxIndex]}
                alt={`Photo ${lightboxIndex + 1}`}
                className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl transition-all"
              />

              <button
                id="btn-next-photo"
                type="button"
                onClick={() =>
                  setLightboxIndex((prev) =>
                    prev !== null ? (prev + 1) % gallery.length : 0
                  )
                }
                aria-label="Next photo"
                className="absolute right-6 z-10 rounded-full bg-white/15 p-3 text-white backdrop-blur-md hover:bg-white/30 transition-transform active:scale-95"
              >
                <CaretRight size={24} weight="bold" />
              </button>
            </div>

            {/* Bottom Thumbnails Strip */}
            <div className="flex gap-2 overflow-x-auto p-6 justify-center">
              {gallery.map((imgUrl, idx) => (
                <button
                  key={imgUrl}
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                    idx === lightboxIndex ? "border-brass scale-105" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={imgUrl} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {/* Mobile Persistent Bottom Action Bar (< md) */}
        <div
          className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-line bg-white/95 backdrop-blur-md px-4 py-2.5 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] flex items-center justify-between gap-3"
          style={{ paddingBottom: "max(10px, env(safe-area-inset-bottom))" }}
        >
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold text-muted uppercase tracking-wider truncate">
              {property.bhk_type} · {property.locality}
            </p>
            <p className="font-display text-base font-bold text-ink leading-tight truncate">
              {formatPrice(property.price_inr, property.price_display)}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 items-center gap-1.5 rounded-full bg-verdigris px-3.5 text-xs font-bold text-white shadow-sm active:scale-95 cursor-pointer"
            >
              <WhatsappLogo size={16} weight="fill" />
              <span>WhatsApp</span>
            </a>
            <a
              href="#enquiry-section"
              className="flex h-10 items-center rounded-full bg-ink px-3.5 text-xs font-bold text-paper shadow-sm active:scale-95 cursor-pointer"
            >
              Enquire
            </a>
          </div>
        </div>

        <Footer />
        <CompareDrawer className="bottom-[calc(4.5rem+env(safe-area-inset-bottom))] md:bottom-[max(1.25rem,env(safe-area-inset-bottom))]" />
        <FloatingConcierge className="hidden md:flex" />
      </div>
    </FooterSettingsContext.Provider>
  );
}
