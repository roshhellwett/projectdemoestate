import { SITE } from "../lib/site";

interface LogoProps {
  className?: string;
  dark?: boolean;
  brandName?: string;
  tagline?: string;
  logoUrl?: string;
  showTagline?: boolean;
}

/**
 * Universal Luxury Real Estate Brand Logo Lockup.
 * Renders an ultra-sharp architectural crest + custom typography.
 * - In light mode: deep ink + burnished brass
 * - In dark mode: ivory paper + gold brass
 * - Fully customizable: adapts to any client name or logo image dynamically.
 */
export function LogoImage({
  className = "h-9",
  dark = false,
  brandName,
  tagline,
  logoUrl,
  showTagline = true,
}: LogoProps) {
  const name = brandName || SITE.name;
  const sub = tagline || "REAL ESTATE ADVISORY";

  // If a custom image logo was provided (e.g. uploaded by client via settings)
  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={name}
        className={`${className} w-auto object-contain`}
      />
    );
  }

  // Pure SVG Vector Lockup - responsive, sharp on all DPRs
  return (
    <div
      className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${
        dark ? "text-paper" : "text-ink"
      }`}
      role="img"
      aria-label={name}
    >
      {/* Architectural Crest Mark */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          viewBox="0 0 40 40"
          className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 transition-transform duration-300 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Outer Box */}
          <rect
            x="2"
            y="2"
            width="36"
            height="36"
            rx="9"
            className={dark ? "fill-ink-2 stroke-brass/40" : "fill-paper stroke-brass/35"}
            strokeWidth="1.2"
          />
          {/* Diamond Pavilion Frame */}
          <path
            d="M20 7L33 20L20 33L7 20L20 7Z"
            stroke={dark ? "#C9A24B" : "#A9862F"}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* Inner Geometries */}
          <line
            x1="20"
            y1="7"
            x2="20"
            y2="33"
            stroke={dark ? "#EBE0C8" : "#A9862F"}
            strokeWidth="1"
            strokeDasharray="2 1.5"
            strokeOpacity="0.7"
          />
          <line
            x1="7"
            y1="20"
            x2="33"
            y2="20"
            stroke={dark ? "#EBE0C8" : "#A9862F"}
            strokeWidth="1"
            strokeOpacity="0.7"
          />
          {/* Center Pinnacle Gem */}
          <polygon
            points="20,13 25,20 20,27 15,20"
            fill={dark ? "#C9A24B" : "#A9862F"}
            fillOpacity="0.3"
            stroke={dark ? "#EBE0C8" : "#C9A24B"}
            strokeWidth="1.2"
          />
          <circle cx="20" cy="20" r="1.8" fill={dark ? "#FAF7F2" : "#12100E"} />
        </svg>
      </div>

      {/* Typography Lockup */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-display text-base sm:text-lg lg:text-xl font-bold tracking-[0.08em] uppercase ${
              dark ? "text-paper" : "text-ink"
            }`}
          >
            {name}
          </span>
          {SITE.isDemo ? (
            <span className="rounded-full bg-brass/15 border border-brass/40 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brass">
              Demo
            </span>
          ) : null}
        </div>

        {showTagline ? (
          <span
            className={`text-[9px] sm:text-[10px] font-semibold tracking-[0.22em] uppercase mt-0.5 ${
              dark ? "text-brass-2" : "text-brass"
            }`}
          >
            {sub}
          </span>
        ) : null}
      </div>
    </div>
  );
}
