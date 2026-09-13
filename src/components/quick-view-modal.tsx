import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import type { Property } from "../lib/types";
import { formatPrice } from "../lib/format";
import { useFavorites } from "../lib/favorites";
import { useCompare } from "../lib/compare";
import { SITE } from "../lib/site";
import {
  X,
  MapPin,
  ArrowsOut,
  Bathtub,
  Car,
  Compass,
  CheckCircle,
  WhatsappLogo,
  Heart,
  Scales,
  ArrowRight,
  Calculator,
} from "@phosphor-icons/react";

interface QuickViewModalProps {
  property: Property | null;
  onClose: () => void;
}

export function QuickViewModal({ property, onClose }: QuickViewModalProps) {
  const { isFavorite, toggle: toggleFav } = useFavorites();
  const { isCompared, toggle: toggleComp } = useCompare();

  // Handle ESC key
  useEffect(() => {
    if (!property) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [property, onClose]);

  if (!property) return null;

  const favorited = isFavorite(property.id);
  const compared = isCompared(property.id);
  const img = property.main_image || property.main_image_thumb;

  // Approximate price per sq.ft
  const pricePerSqFt =
    property.price_inr && property.area_sqft && property.area_sqft > 0
      ? Math.round(property.price_inr / property.area_sqft)
      : null;

  // Approximate monthly EMI (20 yr @ 8.5%, 80% LTV)
  const estimatedEmi = property.price_inr
    ? Math.round((property.price_inr * 0.8 * (0.085 / 12) * Math.pow(1 + 0.085 / 12, 240)) / (Math.pow(1 + 0.085 / 12, 240) - 1))
    : null;

  const waText = encodeURIComponent(
    `Hello SS Property, I am looking at "${property.title}" (${property.locality}, ${formatPrice(property.price_inr, property.price_display)}). Please share floor plans and schedule a private visit.`
  );

  return (
    <div
      id="quick-view-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/75 p-4 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col md:flex-row w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl border border-line bg-white shadow-2xl animate-in zoom-in-95 duration-200"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close preview"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black transition-colors"
        >
          <X size={18} />
        </button>

        {/* Left: Visual Cover */}
        <div className="relative md:w-1/2 min-h-[260px] md:min-h-[460px] bg-paper-2 overflow-hidden shrink-0">
          <img
            src={img}
            alt={property.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="flex items-center gap-1 rounded-full bg-ink/90 px-3 py-1 text-[11px] font-semibold text-paper backdrop-blur-md">
              <CheckCircle size={13} weight="fill" className="text-verdigris" />
              Verified RERA Title
            </span>
            {property.possession_status === "Ready To Move" ? (
              <span className="rounded-full bg-verdigris px-3 py-1 text-[11px] font-semibold text-white">
                Ready to Move
              </span>
            ) : null}
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <p className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-brass">
              <MapPin size={13} weight="fill" />
              {property.locality}
            </p>
            <p className="font-display text-2xl font-bold text-white mt-0.5">
              {formatPrice(property.price_inr, property.price_display)}
            </p>
            {pricePerSqFt ? (
              <p className="text-[11px] text-white/80">
                ₹{pricePerSqFt.toLocaleString("en-IN")} / sq.ft • All Inclusive Rate
              </p>
            ) : null}
          </div>
        </div>

        {/* Right: Spec Breakdown & Actions */}
        <div className="flex flex-1 flex-col justify-between overflow-y-auto p-6 md:p-8">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brass">
              Architectural Quick Dossier
            </span>
            <h3 className="mt-1 font-display text-2xl font-bold text-ink leading-snug">
              {property.title}
            </h3>
            <p className="mt-2 text-xs text-muted leading-relaxed line-clamp-3">
              {property.description}
            </p>

            {/* Key Specs Grid */}
            <div className="mt-6 grid grid-cols-3 gap-2.5">
              <div className="rounded-xl border border-line bg-paper-2/60 p-3 text-center">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted block">
                  Layout
                </span>
                <span className="font-display text-base font-bold text-ink mt-0.5 block">
                  {property.bhk_type}
                </span>
              </div>

              <div className="rounded-xl border border-line bg-paper-2/60 p-3 text-center">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted block">
                  Built-Up
                </span>
                <span className="font-display text-base font-bold text-ink mt-0.5 block">
                  {property.area_sqft ? `${property.area_sqft} sq.ft` : "N/A"}
                </span>
              </div>

              <div className="rounded-xl border border-line bg-paper-2/60 p-3 text-center">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted block">
                  Baths
                </span>
                <span className="font-display text-base font-bold text-ink mt-0.5 block">
                  {property.bathrooms || 2}
                </span>
              </div>

              <div className="rounded-xl border border-line bg-paper-2/60 p-3 text-center">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted block">
                  Floor
                </span>
                <span className="font-display text-xs font-bold text-ink mt-1 block truncate">
                  {property.floor || "Mid Floor"}
                </span>
              </div>

              <div className="rounded-xl border border-line bg-paper-2/60 p-3 text-center">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted block">
                  Facing
                </span>
                <span className="font-display text-xs font-bold text-ink mt-1 block truncate">
                  {property.facing || "Vastu Compliant"}
                </span>
              </div>

              <div className="rounded-xl border border-line bg-paper-2/60 p-3 text-center">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted block">
                  Parking
                </span>
                <span className="font-display text-xs font-bold text-ink mt-1 block truncate">
                  {property.parking || "Reserved"}
                </span>
              </div>
            </div>

            {/* Estimated EMI Callout */}
            {estimatedEmi ? (
              <div className="mt-5 flex items-center justify-between rounded-xl border border-brass/30 bg-brass/5 p-3.5 text-xs">
                <div className="flex items-center gap-2">
                  <Calculator size={18} className="text-brass shrink-0" />
                  <div>
                    <span className="font-semibold text-ink">Est. Monthly EMI</span>
                    <p className="text-[11px] text-muted">20 yrs @ 8.5% RBI floating</p>
                  </div>
                </div>
                <span className="font-display text-base font-bold text-ink">
                  ₹{estimatedEmi.toLocaleString("en-IN")}/mo
                </span>
              </div>
            ) : null}
          </div>

          {/* Action Row */}
          <div className="mt-8 space-y-3 pt-4 border-t border-line">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => toggleFav(property.id)}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-semibold transition-colors ${
                  favorited
                    ? "border-danger bg-danger/10 text-danger"
                    : "border-line bg-paper-2 text-muted hover:text-ink"
                }`}
              >
                <Heart size={15} weight={favorited ? "fill" : "regular"} />
                <span>{favorited ? "Saved" : "Save"}</span>
              </button>

              <button
                type="button"
                onClick={() => toggleComp(property)}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-semibold transition-colors ${
                  compared
                    ? "border-brass bg-brass/15 text-brass-dark font-bold"
                    : "border-line bg-paper-2 text-muted hover:text-ink"
                }`}
              >
                <Scales size={15} weight={compared ? "fill" : "regular"} />
                <span>{compared ? "Compared" : "Compare"}</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <a
                href={`${SITE.whatsapp}?text=${waText}`}
                target="_blank"
                rel="noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-verdigris px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-verdigris/90 transition-colors"
              >
                <WhatsappLogo size={16} weight="fill" />
                <span>Inquire WhatsApp</span>
              </a>

              <Link
                to="/property/$slug"
                params={{ slug: property.slug }}
                onClick={onClose}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-xs font-bold uppercase tracking-wider text-paper hover:bg-ink-2 transition-colors"
              >
                <span>Full Dossier</span>
                <ArrowRight size={14} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
