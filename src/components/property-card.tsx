import { Link } from "@tanstack/react-router";
import type { Property } from "../lib/types";
import { formatPrice } from "../lib/format";

/**
 * Property card for grids. Image, price, BHK + area, locality.
 * Whole card is one link; the img has explicit dimensions for CLS.
 */
export function PropertyCard({ property, priority = false }: { property: Property; priority?: boolean }) {
  const img = property.main_image_thumb || property.main_image;
  return (
    <Link
      to="/property/$slug"
      params={{ slug: property.slug }}
      className="group block overflow-hidden rounded-[var(--radius-card)] border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-16px_rgba(18,16,14,0.18)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
        {img ? (
          <img
            src={img}
            alt={property.title}
            width={900}
            height={675}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : null}
        {property.possession_status === "Ready To Move" ? (
          <span className="absolute left-3 top-3 rounded-full bg-verdigris/95 px-3 py-1 text-[11px] font-semibold text-white">
            Ready to Move
          </span>
        ) : null}
      </div>

      <div className="p-5">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-display text-lg font-semibold text-ink">
            {formatPrice(property.price_inr, property.price_display)}
          </span>
          <span className="text-xs font-medium text-muted">{property.locality}</span>
        </div>
        <h3 className="mt-2 line-clamp-2 text-[15px] font-medium leading-snug text-ink">
          {property.title}
        </h3>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-muted">
          <span>{property.bhk_type}</span>
          {property.area_sqft ? <span>{property.area_sqft.toLocaleString("en-IN")} sq.ft</span> : null}
          {property.furnishing_status ? <span>{property.furnishing_status}</span> : null}
        </div>
      </div>
    </Link>
  );
}
