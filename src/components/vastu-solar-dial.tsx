import { useState, useMemo } from "react";
import { Compass, Sun, Wind, Sparkle, ShieldCheck, ArrowUpRight } from "@phosphor-icons/react";

interface VastuSolarDialProps {
  facing?: string | null;
  locality?: string;
  floor?: string | null;
}

interface DirectionMeta {
  direction: string;
  vedicName: string;
  element: string;
  rulingDeity: string;
  degree: number;
  harmonyScore: number;
  significance: string;
  ventilationBenefit: string;
}

const DIRECTIONS: Record<string, DirectionMeta> = {
  "north-east": {
    direction: "North-East",
    vedicName: "Ishanya (ईशान्य)",
    element: "Jala (Water & Cosmos)",
    rulingDeity: "Lord Shiva / Divine Consciousness",
    degree: 45,
    harmonyScore: 99,
    significance: "Supreme Vastu orientation. Channels spiritual tranquility, clarity of mind, and continuous family harmony.",
    ventilationBenefit: "Unobstructed morning ultraviolet-A rays purify the living space while maintaining cool ambient daytime temperatures.",
  },
  east: {
    direction: "East",
    vedicName: "Poorva (पूर्व)",
    element: "Agni-Surya (Solar Fire)",
    rulingDeity: "Surya Deva (Vitality & Health)",
    degree: 90,
    harmonyScore: 96,
    significance: "Direct gateway to the morning sun. Fosters vitality, academic excellence, and robust physical health.",
    ventilationBenefit: "Captures early dawn natural light from 05:45 AM, eliminating need for artificial morning lighting.",
  },
  north: {
    direction: "North",
    vedicName: "Uttara (उत्तर)",
    element: "Prithvi-Jala (Earth-Water)",
    rulingDeity: "Lord Kubera (Wealth & Treasury)",
    degree: 0,
    harmonyScore: 97,
    significance: "The Kubera quadrant. Governs financial growth, career acceleration, and wealth preservation.",
    ventilationBenefit: "Consistent, glare-free indirect sunlight throughout the day; ideal for home offices and reading lounges.",
  },
  "south-east": {
    direction: "South-East",
    vedicName: "Agneya (आग्नेय)",
    element: "Agni (Fire & Energy)",
    rulingDeity: "Agni Deva (Metabolism & Vigor)",
    degree: 135,
    harmonyScore: 89,
    significance: "The primal fire quadrant. Energizes passion, culinary excellence, and dynamic entrepreneurial drive.",
    ventilationBenefit: "Excellent cross-ventilation corridor catching south-easterly breezes from the Ganges delta.",
  },
  south: {
    direction: "South",
    vedicName: "Dakshina (दक्षिण)",
    element: "Prithvi (Earth & Stability)",
    rulingDeity: "Lord Yama (Justice & Discipline)",
    degree: 180,
    harmonyScore: 88,
    significance: "The endurance sector. Provides structural grounding, legal triumph, and enduring family reputation.",
    ventilationBenefit: "Deep daylight penetration during winter months; shaded during intense Kolkata peak summer afternoons.",
  },
  west: {
    direction: "West",
    vedicName: "Paschima (पश्चिम)",
    element: "Varuna (Water & Ocean)",
    rulingDeity: "Varuna Deva (Commerce & Relations)",
    degree: 270,
    harmonyScore: 91,
    significance: "The Varuna quadrant. Governs social network expansion, international commerce, and evening tranquility.",
    ventilationBenefit: "Spectacular golden-hour sunset panoramas and cool twilight cross-drafts across extended balconies.",
  },
  "north-west": {
    direction: "North-West",
    vedicName: "Vayavya (वायव्य)",
    element: "Vayu (Wind & Movement)",
    rulingDeity: "Vayu Deva (Circulation & Agility)",
    degree: 315,
    harmonyScore: 92,
    significance: "The cosmic wind quadrant. Encourages travel, swift professional advancement, and fluid adaptability.",
    ventilationBenefit: "Continuous natural air displacement and high thermal dissipation index throughout the monsoon season.",
  },
};

export function VastuSolarDial({ facing = "North-East", locality = "Kolkata", floor }: VastuSolarDialProps) {
  const [activeTime, setActiveTime] = useState<"dawn" | "midday" | "dusk">("dawn");

  // Normalize facing string to key
  const normalizedFacing = useMemo(() => {
    if (!facing) return "north-east";
    const lower = facing.toLowerCase();
    if (lower.includes("north") && lower.includes("east")) return "north-east";
    if (lower.includes("south") && lower.includes("east")) return "south-east";
    if (lower.includes("north") && lower.includes("west")) return "north-west";
    if (lower.includes("south") && lower.includes("west")) return "south-east"; // fallback
    if (lower.includes("east")) return "east";
    if (lower.includes("north")) return "north";
    if (lower.includes("south")) return "south";
    return "north-east";
  }, [facing]);

  const meta: DirectionMeta = DIRECTIONS[normalizedFacing] ?? DIRECTIONS["north-east"]!;

  // Calculate rotation angle for compass needle
  const needleRotation = meta.degree;

  return (
    <div className="rounded-3xl border border-line bg-white p-7 md:p-8 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line/60 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brass-ghost text-brass shadow-sm">
            <Compass size={24} weight="duotone" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-xl font-bold text-ink">Architectural Solar & Vastu Blueprint</h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-verdigris/10 px-2.5 py-0.5 text-[11px] font-bold text-verdigris">
                <ShieldCheck size={13} weight="fill" />
                {meta.harmonyScore}% Vastu Harmony
              </span>
            </div>
            <p className="text-xs text-muted">
              Solar path analysis, natural airflow dynamics, and Vedic spatial alignment
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto rounded-full border border-line bg-paper px-3 py-1 text-xs font-semibold text-ink">
          <span className="h-2 w-2 rounded-full bg-verdigris animate-pulse" />
          <span>Orientation: {meta.direction} ({meta.vedicName})</span>
        </div>
      </div>

      {/* Main Grid: Compass Visualizer & Solar Arc Insights */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1.4fr] items-center">
        {/* Visual Compass Graphic */}
        <div className="relative flex flex-col items-center justify-center p-4">
          <div className="relative h-64 w-64 md:h-72 md:md:w-72">
            {/* Outer Compass Ring */}
            <svg viewBox="0 0 240 240" className="h-full w-full select-none">
              {/* Radial gradient definitions */}
              <defs>
                <linearGradient id="needleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C9A24B" />
                  <stop offset="100%" stopColor="#8C6E26" />
                </linearGradient>
                <radialGradient id="compassBg" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FAF7F2" />
                  <stop offset="85%" stopColor="#F2ECE4" />
                  <stop offset="100%" stopColor="#E3DAD0" />
                </radialGradient>
              </defs>

              {/* Background Dial */}
              <circle cx="120" cy="120" r="110" fill="url(#compassBg)" stroke="#D8CFC4" strokeWidth="2" />
              <circle cx="120" cy="120" r="96" fill="none" stroke="#E3DAD0" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="120" cy="120" r="82" fill="none" stroke="#E3DAD0" strokeWidth="1" />

              {/* 8 Cardinal Radial Lines */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <line
                  key={angle}
                  x1="120"
                  y1="24"
                  x2="120"
                  y2="34"
                  transform={`rotate(${angle} 120 120)`}
                  stroke="#A89E92"
                  strokeWidth={angle % 90 === 0 ? "2" : "1"}
                />
              ))}

              {/* Direction Labels */}
              <text x="120" y="18" textAnchor="middle" className="fill-ink text-[11px] font-mono font-bold">N</text>
              <text x="194" y="52" textAnchor="middle" className="fill-brass text-[9px] font-mono font-bold">NE</text>
              <text x="222" y="124" textAnchor="middle" className="fill-ink text-[11px] font-mono font-bold">E</text>
              <text x="194" y="196" textAnchor="middle" className="fill-muted text-[9px] font-mono font-bold">SE</text>
              <text x="120" y="232" textAnchor="middle" className="fill-ink text-[11px] font-mono font-bold">S</text>
              <text x="46" y="196" textAnchor="middle" className="fill-muted text-[9px] font-mono font-bold">SW</text>
              <text x="18" y="124" textAnchor="middle" className="fill-ink text-[11px] font-mono font-bold">W</text>
              <text x="46" y="52" textAnchor="middle" className="fill-muted text-[9px] font-mono font-bold">NW</text>

              {/* Active Orientation Highlight Arc */}
              <g transform={`rotate(${needleRotation} 120 120)`}>
                {/* Target direction pulse cone */}
                <path
                  d="M 120 120 L 105 28 A 92 92 0 0 1 135 28 Z"
                  fill="#C9A24B"
                  fillOpacity="0.25"
                />
                {/* Main Compass Needle */}
                <polygon points="120,24 127,120 120,132 113,120" fill="url(#needleGradient)" />
                <polygon points="120,216 125,120 120,132 115,120" fill="#2E2824" />
                {/* Center Pivot Ring */}
                <circle cx="120" cy="120" r="7" fill="#12100E" stroke="#C9A24B" strokeWidth="2" />
                <circle cx="120" cy="120" r="3" fill="#FAF7F2" />
              </g>
            </svg>

            {/* Floating Tag */}
            <div className="absolute -bottom-2 inset-x-0 flex justify-center">
              <span className="rounded-full bg-ink px-3.5 py-1 text-[11px] font-mono font-semibold text-paper shadow-md">
                Bearing {meta.degree}° · {meta.direction}
              </span>
            </div>
          </div>
        </div>

        {/* Architectural & Vedic Intelligence Column */}
        <div className="space-y-5">
          {/* Vedic Quadrant Card */}
          <div className="rounded-2xl border border-brass/30 bg-brass-ghost/40 p-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-brass">
                Vedic Spatial Matrix
              </span>
              <span className="text-[11px] font-semibold text-muted">Element: {meta.element}</span>
            </div>
            <p className="mt-1 font-display text-base font-bold text-ink">
              {meta.vedicName} — Governed by {meta.rulingDeity}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-ink/80">
              {meta.significance}
            </p>
          </div>

          {/* Interactive Daylight Arc Simulator */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-ink">
                Solar Illumination & Natural Draft Simulator
              </span>
              <span className="text-[11px] text-muted">Kolkata Latitude 22.57° N</span>
            </div>

            {/* Time Toggle Pills */}
            <div className="grid grid-cols-3 gap-1.5 rounded-xl border border-line bg-paper-2 p-1">
              <button
                type="button"
                onClick={() => setActiveTime("dawn")}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-bold transition-all ${
                  activeTime === "dawn"
                    ? "bg-white text-ink shadow-sm"
                    : "text-muted hover:text-ink"
                }`}
              >
                <Sun size={14} className={activeTime === "dawn" ? "text-amber-500" : ""} />
                <span>Dawn (06:00 - 10:30)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTime("midday")}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-bold transition-all ${
                  activeTime === "midday"
                    ? "bg-white text-ink shadow-sm"
                    : "text-muted hover:text-ink"
                }`}
              >
                <Sun size={14} className={activeTime === "midday" ? "text-yellow-600" : ""} />
                <span>Midday (11:00 - 15:00)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTime("dusk")}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-bold transition-all ${
                  activeTime === "dusk"
                    ? "bg-white text-ink shadow-sm"
                    : "text-muted hover:text-ink"
                }`}
              >
                <Wind size={14} className={activeTime === "dusk" ? "text-indigo-500" : ""} />
                <span>Golden Hour & Dusk</span>
              </button>
            </div>

            {/* Dynamic Solar Behavior Detail */}
            <div className="mt-3 rounded-xl border border-line bg-paper p-3.5 text-xs leading-relaxed text-muted">
              {activeTime === "dawn" ? (
                <div className="space-y-1">
                  <p className="font-semibold text-ink flex items-center gap-1.5">
                    <Sparkle size={13} className="text-amber-500" /> Morning Sunlight Absorption:
                  </p>
                  <p>
                    {meta.ventilationBenefit}
                  </p>
                </div>
              ) : activeTime === "midday" ? (
                <div className="space-y-1">
                  <p className="font-semibold text-ink flex items-center gap-1.5">
                    <Sparkle size={13} className="text-yellow-600" /> Overhead Solar Angle & Heat Insulation:
                  </p>
                  <p>
                    High solar zenith (78° angle) shields internal living areas from intense thermal radiation. Exterior overhangs provide passive shading, reducing air conditioning load by up to 18%.
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="font-semibold text-ink flex items-center gap-1.5">
                    <Wind size={13} className="text-indigo-500" /> Twilight Delta Breeze & Cross-Draft:
                  </p>
                  <p>
                    Evening south-easterly wind currents originating from the Bay of Bengal induce natural cross-ventilation, dissipating residual building thermal mass for comfortable, breezy evenings.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Micro-Metrics Grid */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="rounded-xl border border-line bg-paper p-2.5 text-center">
              <span className="block font-mono text-[10px] uppercase tracking-wider text-muted">Cross-Breeze</span>
              <span className="font-display text-base font-bold text-verdigris">94%</span>
              <span className="block text-[10px] text-muted">Dual-aspect airflow</span>
            </div>

            <div className="rounded-xl border border-line bg-paper p-2.5 text-center">
              <span className="block font-mono text-[10px] uppercase tracking-wider text-muted">Daylight Autonomy</span>
              <span className="font-display text-base font-bold text-ink">89%</span>
              <span className="block text-[10px] text-muted">Natural lux rating</span>
            </div>

            <div className="rounded-xl border border-line bg-paper p-2.5 text-center">
              <span className="block font-mono text-[10px] uppercase tracking-wider text-muted">Vastu Score</span>
              <span className="font-display text-base font-bold text-brass">{meta.harmonyScore}/100</span>
              <span className="block text-[10px] text-muted">Highest auspicious</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
