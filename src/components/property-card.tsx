import { Link } from "@tanstack/react-router";
import type { Property } from "../lib/types";
import { formatPrice } from "../lib/format";
import { useFavorites } from "../lib/favorites";
import { useCompare } from "../lib/compare";
import { SITE } from "../lib/site";
import {
  Heart,
  MapPin,
  Bathtub,
  Car,
  CheckCircle,
  WhatsappLogo,
  ArrowsOut,
  Compass,
  Scales,
  Eye,
} from "@phosphor-icons/react";

interface PropertyCardProps {
  property: Property;
  priority?: boolean;
  layout?: "grid" | "list";
  onQuickView?: (property: Property) => void;
}

/**
 * World-class luxury property card.
 * Features verified badge, calculated price/sq.ft, specs pills,
 * 1-click favorite bookmarking, comparison toggle, quick look preview, and WhatsApp inquiry.
 */
export function PropertyCard({
  property,
  priority = false,
  layout = "grid",
  onQuickView,
}: PropertyCardProps) {
  const img = property.main_image_thumb || property.main_image;
  const { isFavorite, toggle } = useFavorites();
  const favorited = isFavorite(property.id);
  const { isCompared, toggle: toggleComp } = useCompare();
  const compared = isCompared(property.id);

  // Price per square foot calculation
  const pricePerSqFt =
    property.price_inr && property.area_sqft && property.area_sqft > 0
      ? Math.round(property.price_inr / property.area_sqft)
      : null;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(property.id);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleComp(property);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(property);
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const text = encodeURIComponent(
      `Hello SS Property, I am interested in "${property.title}" (${property.locality}, priced at ${formatPrice(property.price_inr, property.price_display)}). Please share verified details and schedule a walkthrough.`
    );
    window.open(`${SITE.whatsapp}?text=${text}`, "_blank");
  };

  if (layout === "list") {
    return (
      <Link
        to="/property/$slug"
        params={{ slug: property.slug }}
        className="group relative flex flex-col md:flex-row overflow-hidden rounded-[var(--radius-card)] border border-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brass/50 hover:shadow-[0_20px_40px_-16px_rgba(18,16,14,0.14)]"
      >
        {/* Image side */}
        <div className="relative aspect-[16/10] md:w-80 md:aspect-auto shrink-0 overflow-hidden bg-paper-2">
          {img ? (
            <img
              src={img}
              alt={property.title}
              width={600}
              height={450}
              loading={priority ? "eager" : "lazy"}
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-paper-2 text-xs text-muted">
              SS Property Residence
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="flex items-center gap-1 rounded-full bg-ink/90 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-semibold text-paper">
              <CheckCircle size={12} weight="fill" className="text-verdigris" />
              Verified Title
            </span>
            {property.possession_status === "Ready To Move" ? (
              <span className="rounded-full bg-verdigris px-2.5 py-0.5 text-[10px] font-semibold text-white">
                Ready to Move
              </span>
            ) : null}
          </div>

          {/* Action Buttons: Quick View, Compare, Favorite */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
            {onQuickView ? (
              <button
                type="button"
                onClick={handleQuickViewClick}
                aria-label="Quick preview"
                title="Quick View"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-ink shadow-sm transition-transform hover:scale-110 active:scale-95"
              >
                <Eye size={15} />
              </button>
            ) : null}

            <button
              type="button"
              onClick={handleCompareClick}
              aria-label={compared ? "Remove from compare" : "Add to compare"}
              title={compared ? "Compared" : "Compare"}
              className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md shadow-sm transition-transform hover:scale-110 active:scale-95 ${
                compared ? "bg-brass text-ink font-bold" : "bg-white/90 text-muted hover:text-ink"
              }`}
            >
              <Scales size={15} weight={compared ? "fill" : "regular"} />
            </button>

            <button
              type="button"
              onClick={handleFavoriteClick}
              aria-label={favorited ? "Remove from favorites" : "Save to favorites"}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-ink shadow-sm transition-transform hover:scale-110 active:scale-95"
            >
              <Heart
                size={16}
                weight={favorited ? "fill" : "regular"}
                className={favorited ? "text-danger" : "text-muted"}
              />
            </button>
          </div>
        </div>

        {/* Content Side */}
        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-brass">
                  <MapPin size={13} weight="fill" />
                  {property.locality}
                </span>
                <h3 className="mt-1.5 font-display text-xl font-medium leading-snug text-ink transition-colors group-hover:text-brass">
                  {property.title}
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="font-display text-2xl font-bold text-ink">
                  {formatPrice(property.price_inr, property.price_display)}
                </span>
                {pricePerSqFt ? (
                  <p className="text-[11px] font-medium text-muted">
                    ₹{pricePerSqFt.toLocaleString("en-IN")} / sq.ft
                  </p>
                ) : null}
              </div>
            </div>

            <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-muted">
              {property.description}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-line/60 pt-4">
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted font-medium">
              <span className="rounded-md bg-paper-2 px-2.5 py-1 text-ink font-semibold">
                {property.bhk_type}
              </span>
              {property.area_sqft ? (
                <span className="flex items-center gap-1">
                  <ArrowsOut size={13} className="text-muted" />
                  {property.area_sqft.toLocaleString("en-IN")} sq.ft
                </span>
              ) : null}
              {property.bathrooms ? (
                <span className="flex items-center gap-1">
                  <Bathtub size={13} className="text-muted" />
                  {property.bathrooms} Baths
                </span>
              ) : null}
              {property.parking && property.parking !== "N/A" ? (
                <span className="flex items-center gap-1">
                  <Car size={13} className="text-muted" />
                  {property.parking}
                </span>
              ) : null}
            </div>

            <button
              type="button"
              onClick={handleWhatsAppClick}
              className="flex items-center gap-1.5 rounded-full border border-verdigris/40 bg-verdigris/10 px-3.5 py-1.5 text-xs font-semibold text-verdigris transition-colors hover:bg-verdigris hover:text-white"
            >
              <WhatsappLogo size={14} weight="fill" />
              Inquire
            </button>
          </div>
        </div>
      </Link>
    );
  }

  // Standard Grid Card
  return (
    <Link
      to="/property/$slug"
      params={{ slug: property.slug }}
      className="group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brass/50 hover:shadow-[0_24px_48px_-16px_rgba(18,16,14,0.18)]"
    >
      {/* Media Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper-2">
        {img ? (
          <img
            src={img}
            alt={property.title}
            width={900}
            height={675}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-paper-2 text-xs text-muted">
            SS Property Residence
          </div>
        )}

        {/* Gradient Vignette for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-60" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="flex items-center gap-1 rounded-full bg-ink/90 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-semibold text-paper shadow-sm">
            <CheckCircle size={12} weight="fill" className="text-verdigris" />
            Verified
          </span>
          {property.possession_status === "Ready To Move" ? (
            <span className="rounded-full bg-verdigris px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-sm">
              Ready to Move
            </span>
          ) : null}
        </div>

        {/* Action Buttons: Quick View, Compare, Favorite */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          {onQuickView ? (
            <button
              type="button"
              onClick={handleQuickViewClick}
              aria-label="Quick preview"
              title="Quick View"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-ink shadow-sm transition-transform hover:scale-110 active:scale-95"
            >
              <Eye size={15} />
            </button>
          ) : null}

          <button
            type="button"
            onClick={handleCompareClick}
            aria-label={compared ? "Remove from compare" : "Add to compare"}
            title={compared ? "Compared" : "Compare"}
            className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md shadow-sm transition-transform hover:scale-110 active:scale-95 ${
              compared ? "bg-brass text-ink font-bold" : "bg-white/90 text-muted hover:text-ink"
            }`}
          >
            <Scales size={15} weight={compared ? "fill" : "regular"} />
          </button>

          <button
            type="button"
            onClick={handleFavoriteClick}
            aria-label={favorited ? "Remove from favorites" : "Save to favorites"}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-ink shadow-sm transition-transform hover:scale-110 active:scale-95"
          >
            <Heart
              size={16}
              weight={favorited ? "fill" : "regular"}
              className={favorited ? "text-danger" : "text-muted"}
            />
          </button>
        </div>

        {/* Bottom overlay info on image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white z-10">
          <span className="flex items-center gap-1 text-[11px] font-medium drop-shadow">
            <MapPin size={13} weight="fill" className="text-brass-2" />
            {property.locality}
          </span>
          {property.facing ? (
            <span className="flex items-center gap-1 text-[11px] font-medium drop-shadow opacity-90">
              <Compass size={13} />
              {property.facing} Facing
            </span>
          ) : null}
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          {/* Price & Price/sq.ft */}
          <div className="flex items-baseline justify-between gap-2">
            <span className="font-display text-xl font-bold tracking-tight text-ink">
              {formatPrice(property.price_inr, property.price_display)}
            </span>
            {pricePerSqFt ? (
              <span className="text-[11px] font-medium text-muted">
                ₹{pricePerSqFt.toLocaleString("en-IN")}/sq.ft
              </span>
            ) : (
              <span className="text-[11px] font-medium text-verdigris">Prime Tier</span>
            )}
          </div>

          {/* Title */}
          <h3 className="mt-2 line-clamp-2 text-sm font-medium leading-snug text-ink transition-colors group-hover:text-brass">
            {property.title}
          </h3>
        </div>

        {/* Footer Specs & Quick WhatsApp Link */}
        <div className="mt-4 border-t border-line/60 pt-3 flex items-center justify-between text-xs text-muted">
          <div className="flex items-center gap-2.5">
            <span className="font-semibold text-ink">{property.bhk_type}</span>
            {property.area_sqft ? (
              <>
                <span className="text-line">•</span>
                <span>{property.area_sqft.toLocaleString("en-IN")} sq.ft</span>
              </>
            ) : null}
            {property.bathrooms ? (
              <>
                <span className="text-line">•</span>
                <span>{property.bathrooms} Bath</span>
              </>
            ) : null}
          </div>

          <button
            type="button"
            onClick={handleWhatsAppClick}
            aria-label="Inquire via WhatsApp"
            className="rounded-full p-1 text-verdigris hover:bg-verdigris/10 transition-colors"
            title="Inquire via WhatsApp"
          >
            <WhatsappLogo size={18} weight="fill" />
          </button>
        </div>
      </div>
    </Link>
  );
}
