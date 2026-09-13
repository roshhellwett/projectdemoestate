import { Link } from "@tanstack/react-router";
import { MapPin, Airplane, Train, Sparkle, ArrowRight } from "@phosphor-icons/react";

interface Corridor {
  slug: string;
  name: string;
  tagline: string;
  highlights: string[];
  connectivity: string;
  priceRange: string;
  badge: string;
  image: string;
}

const SUPABASE_STORAGE_URL = "https://vuvxmzrthcitfagwebgm.supabase.co/storage/v1/object/public/media/full";

const KOLKATA_CORRIDORS: Corridor[] = [
  {
    slug: "Lake Town",
    name: "Lake Town & Bangur Avenue",
    tagline: "Prestigious North Kolkata luxury enclave with vintage serenity and VIP Road connectivity.",
    highlights: ["Lake Town Clock Tower & Parks", "5 mins to VIP Road", "10 mins Ultadanga Hub"],
    connectivity: "15 mins to Airport • Metro connected",
    priceRange: "₹62 Lakhs - ₹1.50 Cr",
    badge: "Most Desired Residential",
    image: `${SUPABASE_STORAGE_URL}/216404_ebe0ae6b480a44e68f9f0dde100c4e7e-mv2.webp`,
  },
  {
    slug: "Newtown",
    name: "Newtown & Action Area",
    tagline: "Kolkata's premier smart city with high-rise gated complexes, infinity pools, and IT corridors.",
    highlights: ["Biswa Bangla Gate & Eco Park", "Coal Bhawan IT Belt", "Resort-Grade Gated Living"],
    connectivity: "10 mins to Sector V • Green Zone",
    priceRange: "₹75 Lakhs - ₹1.40 Cr",
    badge: "Smart City & Luxury",
    image: `${SUPABASE_STORAGE_URL}/216404_33ca5cd93f4643eeb818bf63f6f8f680-mv2.webp`,
  },
  {
    slug: "Kasba",
    name: "Kasba & EM Bypass Corridor",
    tagline: "Vibrant South Kolkata core offering high capital appreciation and retail convenience.",
    highlights: ["Acropolis Mall & Ruby Crossing", "Top Multispecialty Hospitals", "Flourishing Dining Scene"],
    connectivity: "5 mins to EM Bypass • Central Metro",
    priceRange: "₹72 Lakhs - ₹1.25 Cr",
    badge: "High Growth & Convenience",
    image: `${SUPABASE_STORAGE_URL}/216404_19174ccbdb1048728884de55c5a9477c-mv2.webp`,
  },
  {
    slug: "Rajarhat",
    name: "Rajarhat & Chinar Park",
    tagline: "Modern gated townships, rapid capital growth, and immediate proximity to the airport.",
    highlights: ["City Centre 2 & Chinar Park", "Wide Arterial Expressways", "Gated Communities"],
    connectivity: "10 mins to Netaji Subhas Airport",
    priceRange: "₹85 Lakhs - ₹1.30 Cr",
    badge: "Airport Corridor",
    image: `${SUPABASE_STORAGE_URL}/216404_33bdfc3a1e7040b6a18d74d7ffbd5e4d-mv2.webp`,
  },
  {
    slug: "C.R. Avenue",
    name: "Central Kolkata & Commercial",
    tagline: "High-footfall central commercial hubs next to Chandni Chowk & Esplanade metro lines.",
    highlights: ["Next to Chandni Chowk Metro", "2 mins Esplanade Crossing", "Heritage Commercial Core"],
    connectivity: "Central Metro line & Railway hubs",
    priceRange: "₹1.35 Cr - ₹2.20 Cr",
    badge: "Commercial Prime",
    image: `${SUPABASE_STORAGE_URL}/216404_985fbc54067346d48edd2436a27ee304-mv2.webp`,
  },
];

export interface LocalityCorridorsSectionProps {
  corridorCounts?: Record<string, number>;
}

export function LocalityCorridorsSection({ corridorCounts = {} }: LocalityCorridorsSectionProps) {
  return (
    <section className="shell-wide py-20 md:py-28 border-t border-line">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow flex items-center gap-1.5 text-brass">
            <Sparkle size={14} weight="fill" />
            Prime Kolkata Corridors
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">
            Explore Kolkata’s most coveted addresses
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted leading-relaxed">
            From peaceful heritage enclaves in Lake Town to high-altitude luxury in Newtown and bustling South Kolkata hubs in Kasba.
          </p>
        </div>

        <Link
          to="/properties"
          className="hidden items-center gap-1 text-sm font-semibold text-brass transition-colors hover:text-ink sm:flex"
        >
          Explore All Corridors <ArrowRight size={15} />
        </Link>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {KOLKATA_CORRIDORS.map((corridor) => {
          const liveCount = corridorCounts[corridor.slug] ?? 0;
          return (
            <Link
              key={corridor.slug}
              to="/properties"
              search={{ locality: corridor.slug, bhk: "" }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[var(--radius-card)] border border-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brass/60 hover:shadow-[0_20px_40px_-14px_rgba(18,16,14,0.16)]"
            >
              {/* Image Header */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-paper-2">
                <img
                  src={corridor.image}
                  alt={corridor.name}
                  width={700}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent" />

                <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur-md px-3 py-0.5 text-[10px] font-bold text-ink shadow-sm">
                  {corridor.badge}
                </span>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="flex items-center gap-1 text-xs font-semibold text-brass-2">
                    <MapPin size={13} weight="fill" />
                    {liveCount > 0
                      ? `${liveCount} Verified ${liveCount === 1 ? "Listing" : "Listings"}`
                      : "Prime Residential Address"}
                  </span>
                  <h3 className="font-display text-lg font-bold text-white drop-shadow">
                    {corridor.name}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <p className="text-xs text-muted leading-relaxed">
                    {corridor.tagline}
                  </p>

                  <div className="mt-4 space-y-1.5 border-t border-line/60 pt-3 text-[11px] text-ink font-medium">
                    {corridor.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-brass" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-line/60 pt-3 text-xs">
                  <span className="font-semibold text-ink">{corridor.priceRange}</span>
                  <span className="flex items-center gap-1 font-semibold text-brass transition-transform group-hover:translate-x-1">
                    Explore <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
