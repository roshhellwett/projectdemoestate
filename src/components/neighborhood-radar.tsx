import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  AirplaneTilt,
  Buildings,
  Train,
  Clock,
  Compass,
  ArrowRight,
  Sparkle,
  TrendUp,
  ShieldCheck,
} from "@phosphor-icons/react";

interface CorridorDetail {
  name: string;
  tag: string;
  pricePerSqFt: string;
  airportMins: number;
  sectorVMins: number;
  parkStreetMins: number;
  metroLine: string;
  description: string;
  highlights: string[];
}

const CORRIDORS_DATA: CorridorDetail[] = [
  {
    name: "Lake Town & Bangur",
    tag: "Established North-East Core",
    pricePerSqFt: "₹6,800 – ₹8,500",
    airportMins: 15,
    sectorVMins: 18,
    parkStreetMins: 25,
    metroLine: "Dum Dum / Metro Line 1 & VIP Road Connect",
    description:
      "Prestigious residential haven along VIP Road with clock-tower heritage, upscale gated developments, and walking access to diamond-hub commercial markets.",
    highlights: ["15 mins to Airport", "Jaya Multiplex", "Gated Communities", "Top CBSE Schools"],
  },
  {
    name: "Newtown (Action Area I & II)",
    tag: "Smart City Financial Hub",
    pricePerSqFt: "₹7,200 – ₹10,800",
    airportMins: 12,
    sectorVMins: 10,
    parkStreetMins: 30,
    metroLine: "Metro Line 6 (Orange Line corridor)",
    description:
      "Kolkata's crown-jewel planned township featuring high-rise luxury towers with infinity pools, Tata Medical Center, IT business parks, and Eco Park.",
    highlights: ["Infinity Pool Towers", "Eco Park 480 Acres", "Direct Orange Line Metro", "Tech SEZs"],
  },
  {
    name: "Kasba & Ruby Crossing",
    tag: "South Kolkata Commercial Nexus",
    pricePerSqFt: "₹7,500 – ₹11,200",
    airportMins: 35,
    sectorVMins: 15,
    parkStreetMins: 18,
    metroLine: "Hemanta Mukherjee (Ruby) Metro Station",
    description:
      "Strategic corridor connecting EM Bypass to Ballygunge. Minutes from Acropolis Mall, Ruby General Hospital, and top-tier dining precincts.",
    highlights: ["Walk to Acropolis Mall", "Ruby Hospital Nexus", "5 mins to Gariahat", "EM Bypass Arterial"],
  },
  {
    name: "Rajarhat & Chinar Park",
    tag: "Airport Expressway Growth Hub",
    pricePerSqFt: "₹5,500 – ₹7,800",
    airportMins: 10,
    sectorVMins: 15,
    parkStreetMins: 35,
    metroLine: "Chinar Park Metro Station (Orange Line)",
    description:
      "Vibrant lifestyle district known for modern apartment complexes, luxury hotel corridors, City Centre 2, and unparalleled airport proximity.",
    highlights: ["10 mins to CCU Airport", "City Centre 2", "Expressway Flyovers", "Affordable Luxury"],
  },
  {
    name: "C.R. Avenue & Central Kolkata",
    tag: "Heritage Central Business District",
    pricePerSqFt: "₹12,000 – ₹16,500",
    airportMins: 30,
    sectorVMins: 22,
    parkStreetMins: 8,
    metroLine: "Chandni Chowk / Central Metro Station",
    description:
      "The historical heartbeat of Kolkata commerce. Unrivaled footfall, high rental yields, and walking distance to Esplanade and Raj Bhavan.",
    highlights: ["Direct Metro Interchanges", "Prime Commercial Yields", "Colonial Heritage", "Walk to Esplanade"],
  },
];

export interface NeighborhoodRadarProps {
  corridorCounts?: Record<string, number>;
}

export function NeighborhoodRadar({ corridorCounts = {} }: NeighborhoodRadarProps) {
  const [selectedCorridor, setSelectedCorridor] = useState<CorridorDetail>(CORRIDORS_DATA[0]!);

  return (
    <section className="shell-wide py-14 sm:py-20 md:py-24 border-t border-line">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-brass/40 bg-brass/10 px-3.5 py-1 text-xs font-semibold text-brass-dark">
            <Compass size={14} weight="fill" className="text-brass" />
            <span>Kolkata Spatial & Transit Intelligence</span>
          </div>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-ink">
            Corridor Radar & Commute Matrix
          </h2>
          <p className="mt-2 text-xs md:text-sm text-muted max-w-xl leading-relaxed">
            Precise travel times to Kolkata’s essential lifelines and verified capital benchmarks across prime residential enclaves.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-xs font-semibold text-muted">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={16} weight="fill" className="text-verdigris" />
            100% On-Ground Verified
          </span>
          <span className="flex items-center gap-1.5">
            <TrendUp size={16} className="text-brass" />
            Live Q3 Capital Rates
          </span>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="mt-6 sm:mt-10 grid gap-6 sm:gap-8 lg:grid-cols-[1.1fr_1.9fr] items-start">
        {/* Left Column: Corridor Selector Pills */}
        <div className="scroll-rail lg:flex lg:flex-col gap-3">
          {CORRIDORS_DATA.map((c) => {
            const isSelected = selectedCorridor.name === c.name;
            const primaryKey = c.name.split(" ")[0] ?? "";
            const count = corridorCounts[primaryKey] ?? corridorCounts[c.name] ?? 0;
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => setSelectedCorridor(c)}
                className={`w-full min-w-[260px] sm:min-w-0 text-left rounded-2xl p-4 sm:p-5 border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "border-brass bg-white shadow-lg shadow-brass/10 -translate-y-0.5"
                    : "border-line bg-white/60 hover:bg-white hover:border-brass/40 text-muted"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brass block">
                      {c.tag}
                    </span>
                    <h4
                      className={`font-display text-lg font-bold mt-0.5 ${
                        isSelected ? "text-ink" : "text-ink/80"
                      }`}
                    >
                      {c.name}
                    </h4>
                  </div>
                  <span className="rounded-full bg-paper-2 px-2.5 py-1 text-[11px] font-bold text-ink">
                    {count > 0 ? `${count} Active` : "Prime Enclave"}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs border-t border-line/60 pt-3">
                  <span className="text-muted">Avg. Rate:</span>
                  <span className="font-bold text-ink">{c.pricePerSqFt} / sq.ft</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Active Corridor Deep-Dive Spec Card */}
        <div className="rounded-2xl sm:rounded-3xl border border-line bg-white p-5 sm:p-8 md:p-10 shadow-sm relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-brass/5 blur-3xl pointer-events-none" />

          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brass">
                {selectedCorridor.tag}
              </span>
              <h3 className="mt-1 font-display text-2xl md:text-3xl font-bold text-ink">
                {selectedCorridor.name}
              </h3>
              <p className="mt-3 text-xs md:text-sm text-muted leading-relaxed max-w-lg">
                {selectedCorridor.description}
              </p>
            </div>

            <div className="text-left sm:text-right rounded-2xl bg-paper-2 p-4 border border-line">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted block">
                Capital Benchmark
              </span>
              <span className="font-display text-xl font-bold text-ink block mt-0.5">
                {selectedCorridor.pricePerSqFt}
              </span>
              <span className="text-[10px] text-muted">per super built-up sq.ft</span>
            </div>
          </div>

          {/* Commute Time Cards (Airport, IT SEZ, Park Street, Metro) */}
          <div className="mt-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink mb-4 flex items-center gap-1.5">
              <Clock size={15} className="text-brass" />
              <span>Drive & Transit Times from {selectedCorridor.name}</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Airport */}
              <div className="rounded-2xl border border-line bg-paper-2/60 p-4 text-center">
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-white text-ink shadow-sm">
                  <AirplaneTilt size={18} weight="fill" className="text-brass" />
                </div>
                <span className="font-display text-xl font-bold text-ink mt-2 block">
                  {selectedCorridor.airportMins} mins
                </span>
                <span className="text-[10px] font-medium text-muted block">
                  CCU Airport
                </span>
              </div>

              {/* Sector V */}
              <div className="rounded-2xl border border-line bg-paper-2/60 p-4 text-center">
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-white text-ink shadow-sm">
                  <Buildings size={18} weight="fill" className="text-verdigris" />
                </div>
                <span className="font-display text-xl font-bold text-ink mt-2 block">
                  {selectedCorridor.sectorVMins} mins
                </span>
                <span className="text-[10px] font-medium text-muted block">
                  Sector V IT Hub
                </span>
              </div>

              {/* Park Street */}
              <div className="rounded-2xl border border-line bg-paper-2/60 p-4 text-center">
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-white text-ink shadow-sm">
                  <Compass size={18} weight="fill" className="text-ink" />
                </div>
                <span className="font-display text-xl font-bold text-ink mt-2 block">
                  {selectedCorridor.parkStreetMins} mins
                </span>
                <span className="text-[10px] font-medium text-muted block">
                  Park Street CBD
                </span>
              </div>

              {/* Metro Station */}
              <div className="rounded-2xl border border-line bg-paper-2/60 p-4 text-center">
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-white text-ink shadow-sm">
                  <Train size={18} weight="fill" className="text-brass-dark" />
                </div>
                <span className="font-display text-base font-bold text-ink mt-2 block truncate" title={selectedCorridor.metroLine}>
                  Orange/Blue
                </span>
                <span className="text-[10px] font-medium text-muted block truncate">
                  Metro Rail Line
                </span>
              </div>
            </div>
          </div>

          {/* Highlights Pills & Filter CTA */}
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-line">
            <div className="flex flex-wrap gap-2">
              {selectedCorridor.highlights.map((hl) => (
                <span
                  key={hl}
                  className="rounded-full border border-line bg-white px-3 py-1 text-[11px] font-semibold text-ink"
                >
                  ✓ {hl}
                </span>
              ))}
            </div>

            <Link
              to="/properties"
              search={{ locality: (selectedCorridor.name.split(" &")[0] || "All").trim() }}
              className="flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-xs font-bold uppercase tracking-wider text-paper shadow-md hover:bg-ink-2 transition-transform hover:scale-105 active:scale-95 shrink-0"
            >
              <span>View {selectedCorridor.name} Listings</span>
              <ArrowRight size={14} weight="bold" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
