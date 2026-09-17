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
 * Mobile-first luxury property card.
 * Touch targets ≥ 44px, readable text, accessible labels.
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

  /* ─── List Layout (desktop only, force grid on mobile) ─── */
  if (layout === "list") {
    return (
      <>
        {/* List view on md+ */}
        <Link
          to="/property/$slug"
          params={{ slug: property.slug }}
          className="group relative hidden md:flex flex-row overflow-hidden rounded-[var(--radius-card)] border border-brass/35 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brass hover:shadow-lg hover:shadow-brass/10 hover:ring-1 hover:ring-brass/25"
        >
          {/* Image side */}
          <div className="relative w-80 shrink-0 overflow-hidden bg-paper-2">
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
              <div className="flex h-full w-full items-center justify-center bg-paper-2 text-sm text-muted">
                SS Property Residence
              </div>
            )}
            <CardBadges property={property} />
            <CardActions
              onQuickView={onQuickView ? handleQuickViewClick : undefined}
              onCompare={handleCompareClick}
              onFavorite={handleFavoriteClick}
              compared={compared}
              favorited={favorited}
            />
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
                    <p className="text-xs font-medium text-muted">
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
              <PropertySpecs property={property} />
              <WhatsAppButton onClick={handleWhatsAppClick} expanded />
            </div>
          </div>
        </Link>

        {/* Grid fallback on mobile for list items */}
        <div className="md:hidden">
          <GridCard
            property={property}
            img={img}
            priority={priority}
            pricePerSqFt={pricePerSqFt}
            favorited={favorited}
            compared={compared}
            onQuickView={onQuickView ? handleQuickViewClick : undefined}
            onCompare={handleCompareClick}
            onFavorite={handleFavoriteClick}
            onWhatsApp={handleWhatsAppClick}
          />
        </div>
      </>
    );
  }

  /* ─── Standard Grid Card ─── */
  return (
    <GridCard
      property={property}
      img={img}
      priority={priority}
      pricePerSqFt={pricePerSqFt}
      favorited={favorited}
      compared={compared}
      onQuickView={onQuickView ? handleQuickViewClick : undefined}
      onCompare={handleCompareClick}
      onFavorite={handleFavoriteClick}
      onWhatsApp={handleWhatsAppClick}
    />
  );
}

/* ─────────────────────── Sub-components ─────────────────────── */

function GridCard({
  property,
  img,
  priority,
  pricePerSqFt,
  favorited,
  compared,
  onQuickView,
  onCompare,
  onFavorite,
  onWhatsApp,
}: {
  property: Property;
  img: string | null;
  priority: boolean;
  pricePerSqFt: number | null;
  favorited: boolean;
  compared: boolean;
  onQuickView?: (e: React.MouseEvent) => void;
  onCompare: (e: React.MouseEvent) => void;
  onFavorite: (e: React.MouseEvent) => void;
  onWhatsApp: (e: React.MouseEvent) => void;
}) {
  return (
    <Link
      to="/property/$slug"
      params={{ slug: property.slug }}
      className="group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-brass/35 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brass hover:shadow-[0_24px_48px_-16px_rgba(18,16,14,0.18)] hover:shadow-brass/15 hover:ring-1 hover:ring-brass/25"
    >
      {/* Media Container */}
      <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-paper-2">
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
          <div className="flex h-full w-full items-center justify-center bg-paper-2 text-sm text-muted">
            SS Property Residence
          </div>
        )}

        {/* Gradient Vignette for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-60" />

        <CardBadges property={property} />
        <CardActions
          onQuickView={onQuickView}
          onCompare={onCompare}
          onFavorite={onFavorite}
          compared={compared}
          favorited={favorited}
        />

        {/* Bottom overlay info on image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white z-10">
          <span className="flex items-center gap-1 text-xs font-medium drop-shadow">
            <MapPin size={14} weight="fill" className="text-brass-2" />
            {property.locality}
          </span>
          {property.facing ? (
            <span className="flex items-center gap-1 text-xs font-medium drop-shadow opacity-90">
              <Compass size={14} />
              {property.facing} Facing
            </span>
          ) : null}
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div>
          {/* Price & Price/sq.ft */}
          <div className="flex items-baseline justify-between gap-2">
            <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-ink">
              {formatPrice(property.price_inr, property.price_display)}
            </span>
            {pricePerSqFt ? (
              <span className="text-xs font-medium text-muted">
                ₹{pricePerSqFt.toLocaleString("en-IN")}/sq.ft
              </span>
            ) : (
              <span className="text-xs font-medium text-verdigris">Prime Tier</span>
            )}
          </div>

          {/* Title */}
          <h3 className="mt-2 line-clamp-2 text-sm font-medium leading-snug text-ink transition-colors group-hover:text-brass">
            {property.title}
          </h3>
        </div>

        {/* Footer Specs & Quick WhatsApp */}
        <div className="mt-4 border-t border-line/60 pt-3 flex items-center justify-between gap-2 text-xs text-muted">
          <div className="flex items-center gap-2 min-w-0 overflow-hidden">
            <span className="font-semibold text-ink shrink-0">{property.bhk_type}</span>
            {property.area_sqft ? (
              <>
                <span className="text-line shrink-0">•</span>
                <span className="truncate">{property.area_sqft.toLocaleString("en-IN")} sq.ft</span>
              </>
            ) : null}
            {property.bathrooms ? (
              <>
                <span className="text-line shrink-0">•</span>
                <span className="shrink-0">{property.bathrooms} Bath</span>
              </>
            ) : null}
          </div>

          <WhatsAppButton onClick={onWhatsApp} />
        </div>
      </div>
    </Link>
  );
}

/** Top-left verified & status badges */
function CardBadges({ property }: { property: Property }) {
  return (
    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
      <span className="flex items-center gap-1 rounded-full border border-brass/30 bg-ink/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold text-paper shadow-sm">
        <CheckCircle size={13} weight="fill" className="text-verdigris" />
        Verified
      </span>
      {property.possession_status === "Ready To Move" ? (
        <span className="rounded-full border border-brass-2/40 bg-verdigris px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
          Ready to Move
        </span>
      ) : null}
    </div>
  );
}

/** Top-right action buttons — ≥40px touch targets */
function CardActions({
  onQuickView,
  onCompare,
  onFavorite,
  compared,
  favorited,
}: {
  onQuickView?: (e: React.MouseEvent) => void;
  onCompare: (e: React.MouseEvent) => void;
  onFavorite: (e: React.MouseEvent) => void;
  compared: boolean;
  favorited: boolean;
}) {
  return (
    <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
      {onQuickView ? (
        <button
          type="button"
          onClick={onQuickView}
          aria-label="Quick preview"
          title="Quick View"
          className="touch-sm flex h-10 w-10 items-center justify-center rounded-full border border-brass/35 bg-white/90 backdrop-blur-md text-ink shadow-sm transition-all hover:scale-110 hover:border-brass hover:shadow-brass/20 active:scale-95 cursor-pointer"
        >
          <Eye size={17} />
        </button>
      ) : null}

      <button
        type="button"
        onClick={onCompare}
        aria-label={compared ? "Remove from compare" : "Add to compare"}
        title={compared ? "Compared" : "Compare"}
        className={`touch-sm flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md shadow-sm transition-all hover:scale-110 active:scale-95 cursor-pointer ${
          compared
            ? "border-brass bg-brass text-ink font-bold shadow-brass/20"
            : "border-brass/35 bg-white/90 text-muted hover:border-brass hover:text-ink hover:shadow-brass/20"
        }`}
      >
        <Scales size={17} weight={compared ? "fill" : "regular"} />
      </button>

      <button
        type="button"
        onClick={onFavorite}
        aria-label={favorited ? "Remove from favorites" : "Save to favorites"}
        className="touch-sm flex h-10 w-10 items-center justify-center rounded-full border border-brass/35 bg-white/90 backdrop-blur-md text-ink shadow-sm transition-all hover:scale-110 hover:border-brass hover:shadow-brass/20 active:scale-95 cursor-pointer"
      >
        <Heart
          size={18}
          weight={favorited ? "fill" : "regular"}
          className={favorited ? "text-danger" : "text-muted"}
        />
      </button>
    </div>
  );
}

/** Property spec pills */
function PropertySpecs({ property }: { property: Property }) {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-muted font-medium">
      <span className="rounded-md border border-brass/30 bg-paper-2 px-2.5 py-1 text-ink font-semibold">
        {property.bhk_type}
      </span>
      {property.area_sqft ? (
        <span className="flex items-center gap-1">
          <ArrowsOut size={14} className="text-muted" />
          {property.area_sqft.toLocaleString("en-IN")} sq.ft
        </span>
      ) : null}
      {property.bathrooms ? (
        <span className="flex items-center gap-1">
          <Bathtub size={14} className="text-muted" />
          {property.bathrooms} Baths
        </span>
      ) : null}
      {property.parking && property.parking !== "N/A" ? (
        <span className="flex items-center gap-1">
          <Car size={14} className="text-muted" />
          {property.parking}
        </span>
      ) : null}
    </div>
  );
}

/** WhatsApp inquiry button — visible pill on mobile */
function WhatsAppButton({
  onClick,
  expanded = false,
}: {
  onClick: (e: React.MouseEvent) => void;
  expanded?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Inquire via WhatsApp"
      className={`touch-sm flex items-center gap-1.5 rounded-full text-verdigris transition-colors cursor-pointer shrink-0 ${
        expanded
          ? "border border-verdigris/40 bg-verdigris/10 px-3.5 py-2 text-xs font-semibold hover:bg-verdigris hover:text-white"
          : "p-2 hover:bg-verdigris/10"
      }`}
      title="Inquire via WhatsApp"
    >
      <WhatsappLogo size={expanded ? 15 : 20} weight="fill" />
      {expanded ? <span>Inquire</span> : null}
    </button>
  );
}
