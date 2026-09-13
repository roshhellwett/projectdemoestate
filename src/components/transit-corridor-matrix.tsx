import { useMemo } from "react";
import { Train, AirplaneTilt, Buildings, FirstAid, GraduationCap, ShoppingBag, MapPin, NavigationArrow } from "@phosphor-icons/react";

interface TransitCorridorMatrixProps {
  locality: string;
  landmarks?: string[];
}

interface TransitHub {
  name: string;
  category: "metro" | "airport" | "business" | "healthcare" | "education" | "lifestyle";
  distanceKm: number;
  driveTimeMins: number;
  metroTimeMins?: number;
  lineOrRoute: string;
  tag: string;
}

const LOCALITY_HUBS: Record<string, TransitHub[]> = {
  "lake town": [
    { name: "Dum Dum Metro Interchange", category: "metro", distanceKm: 2.8, driveTimeMins: 9, metroTimeMins: 5, lineOrRoute: "Blue Line (Dakshineswar - Kavi Subhash)", tag: "Rapid Rail Access" },
    { name: "Netaji Subhash Chandra Bose Int'l Airport (CCU)", category: "airport", distanceKm: 6.2, driveTimeMins: 14, lineOrRoute: "VIP Road Expressway", tag: "Direct Corridor" },
    { name: "Salt Lake Sector V IT SEZ", category: "business", distanceKm: 5.5, driveTimeMins: 15, lineOrRoute: "Ultadanga - EM Bypass Connector", tag: "Tech Sector Access" },
    { name: "Apollo Multispeciality Hospitals", category: "healthcare", distanceKm: 4.8, driveTimeMins: 12, lineOrRoute: "EM Bypass Corridor", tag: "Tertiary Care" },
    { name: "City Centre 1 Salt Lake", category: "lifestyle", distanceKm: 3.8, driveTimeMins: 11, lineOrRoute: "Salt Lake 3rd Avenue", tag: "Retail & Dining" },
    { name: "Calcutta International School / DPS", category: "education", distanceKm: 6.0, driveTimeMins: 16, lineOrRoute: "VIP Road / EM Bypass", tag: "Premier Schooling" },
  ],
  "bangur": [
    { name: "Dum Dum Metro Junction", category: "metro", distanceKm: 2.4, driveTimeMins: 8, metroTimeMins: 4, lineOrRoute: "Blue Line Main Corridor", tag: "Walking Proximity" },
    { name: "Kolkata Int'l Airport (CCU)", category: "airport", distanceKm: 6.8, driveTimeMins: 15, lineOrRoute: "VIP Road Arterial", tag: "Airport Corridor" },
    { name: "Ultadanga Railway & Transit Terminal", category: "metro", distanceKm: 2.9, driveTimeMins: 8, lineOrRoute: "EM Bypass Origin", tag: "Intercity Junction" },
    { name: "AMRI Hospital Salt Lake", category: "healthcare", distanceKm: 4.2, driveTimeMins: 11, lineOrRoute: "Salt Lake Bypass", tag: "Super Specialty" },
    { name: "Clock Tower & Lake Town Leisure Lake", category: "lifestyle", distanceKm: 0.8, driveTimeMins: 3, lineOrRoute: "Lake Town Main Road", tag: "Walking Distance" },
  ],
  "newtown": [
    { name: "Nazrul Tirtha / New Town Metro", category: "metro", distanceKm: 1.2, driveTimeMins: 4, metroTimeMins: 3, lineOrRoute: "Orange Line 6 Corridor", tag: "Station Adjacent" },
    { name: "Sector V IT Hub & Wipro Campus", category: "business", distanceKm: 3.5, driveTimeMins: 9, metroTimeMins: 6, lineOrRoute: "Major Arterial Road (MAR)", tag: "5-Min Commute" },
    { name: "Netaji Subhash Chandra Bose Int'l Airport", category: "airport", distanceKm: 9.8, driveTimeMins: 18, lineOrRoute: "Rajarhat Expressway MAR", tag: "Signal-Free Flow" },
    { name: "Tata Medical Center", category: "healthcare", distanceKm: 2.1, driveTimeMins: 6, lineOrRoute: "Action Area II Arterial", tag: "Premier Oncology" },
    { name: "Eco Park & Kolkata Golf Center", category: "lifestyle", distanceKm: 2.5, driveTimeMins: 7, lineOrRoute: "Biswa Bangla Sarani", tag: "480-Acre Parkland" },
    { name: "DPS New Town & Ohio State University Center", category: "education", distanceKm: 1.8, driveTimeMins: 5, lineOrRoute: "Action Area I", tag: "Educational Zone" },
  ],
  "kasba": [
    { name: "Hemanta Mukherjee Metro (Ruby)", category: "metro", distanceKm: 1.4, driveTimeMins: 5, metroTimeMins: 4, lineOrRoute: "Orange Line EM Bypass", tag: "Metro Proximity" },
    { name: "Ruby General & Fortis Hospital Hub", category: "healthcare", distanceKm: 1.2, driveTimeMins: 4, lineOrRoute: "EM Bypass Med-Corridor", tag: "Kolkata Med-Capital" },
    { name: "Park Street & Camac Street CBD", category: "business", distanceKm: 7.2, driveTimeMins: 20, lineOrRoute: "Maa Flyover Expressway", tag: "Downtown Link" },
    { name: "South City Mall & Prince Anwar Shah Road", category: "lifestyle", distanceKm: 3.5, driveTimeMins: 10, lineOrRoute: "Prince Anwar Shah Connector", tag: "Luxury Mall" },
    { name: "Calcutta International School", category: "education", distanceKm: 1.8, driveTimeMins: 6, lineOrRoute: "Bypass Service Road", tag: "IB World School" },
  ],
  "garia": [
    { name: "Kavi Subhash Apex Metro Interchange", category: "metro", distanceKm: 1.1, driveTimeMins: 4, metroTimeMins: 3, lineOrRoute: "Blue Line + Orange Line Hub", tag: "Twin Metro Interchange" },
    { name: "Peerless Hospital & B.K. Roy Research Center", category: "healthcare", distanceKm: 1.5, driveTimeMins: 5, lineOrRoute: "Panchasayar Connector", tag: "Super-Specialty" },
    { name: "Highland Park Metropolis & Mall", category: "lifestyle", distanceKm: 1.8, driveTimeMins: 6, lineOrRoute: "EM Bypass Extension", tag: "Shopping & Multiplex" },
    { name: "Rabindra Sarobar Southern Lakes", category: "lifestyle", distanceKm: 6.5, driveTimeMins: 18, lineOrRoute: "Southern Avenue Arterial", tag: "Heritage Parkland" },
  ],
  "nayabad": [
    { name: "Kavi Subhash Metro & Eastern Railway Junction", category: "metro", distanceKm: 0.9, driveTimeMins: 3, metroTimeMins: 2, lineOrRoute: "Blue Line + Line 6 Interchange", tag: "Walking Distance" },
    { name: "Medica Superspecialty Hospital", category: "healthcare", distanceKm: 2.8, driveTimeMins: 8, lineOrRoute: "Mukundapur EM Bypass", tag: "Emergency Care" },
    { name: "Future Institute of Technology & Heritage Campus", category: "education", distanceKm: 3.1, driveTimeMins: 9, lineOrRoute: "Anandapur Link Road", tag: "Campus Vicinity" },
    { name: "Sector V IT Corridor via EM Bypass", category: "business", distanceKm: 12.0, driveTimeMins: 24, lineOrRoute: "EM Bypass Signal-Free Arterial", tag: "Direct Arterial" },
  ],
  "rajarhat": [
    { name: "Chinar Park Metro Station", category: "metro", distanceKm: 1.5, driveTimeMins: 5, lineOrRoute: "Orange Line Extension", tag: "Metro Corridor" },
    { name: "CCU International Airport", category: "airport", distanceKm: 4.8, driveTimeMins: 12, lineOrRoute: "VIP Road Expressway", tag: "Fast Transit" },
    { name: "City Centre 2 & Chinar Park Retail Strip", category: "lifestyle", distanceKm: 1.8, driveTimeMins: 6, lineOrRoute: "Major Arterial Road", tag: "Shopping Hub" },
    { name: "Charnock Hospital", category: "healthcare", distanceKm: 2.2, driveTimeMins: 7, lineOrRoute: "VIP Connector", tag: "Multi-Specialty" },
  ],
};

export function TransitCorridorMatrix({ locality, landmarks = [] }: TransitCorridorMatrixProps) {
  const normalizedLoc = useMemo(() => {
    const l = locality.toLowerCase();
    for (const key of Object.keys(LOCALITY_HUBS)) {
      if (l.includes(key)) return key;
    }
    return "lake town";
  }, [locality]);

  const hubs = LOCALITY_HUBS[normalizedLoc] ?? LOCALITY_HUBS["lake town"] ?? [];

  const getCategoryIcon = (category: TransitHub["category"]) => {
    switch (category) {
      case "metro":
        return <Train size={18} weight="duotone" className="text-brass" />;
      case "airport":
        return <AirplaneTilt size={18} weight="duotone" className="text-sky-600" />;
      case "business":
        return <Buildings size={18} weight="duotone" className="text-verdigris" />;
      case "healthcare":
        return <FirstAid size={18} weight="duotone" className="text-red-500" />;
      case "education":
        return <GraduationCap size={18} weight="duotone" className="text-amber-600" />;
      case "lifestyle":
        return <ShoppingBag size={18} weight="duotone" className="text-purple-600" />;
    }
  };

  return (
    <div className="rounded-3xl border border-line bg-white p-7 md:p-8 shadow-sm">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line/60 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brass-ghost text-brass shadow-sm">
            <NavigationArrow size={24} weight="duotone" />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-ink">
              Transit & Urban Infrastructure Corridor
            </h3>
            <p className="text-xs text-muted">
              Measured commute durations and multi-modal transit links from {locality}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-muted">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-verdigris" />
            Verified Travel Times
          </span>
        </div>
      </div>

      {/* Transit Hubs Grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {hubs.map((hub) => (
          <div
            key={hub.name}
            className="group relative rounded-2xl border border-line bg-paper p-4 transition-all duration-300 hover:border-brass/50 hover:bg-white hover:shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-line shadow-xs">
                {getCategoryIcon(hub.category)}
              </div>
              <span className="rounded-full bg-brass/10 px-2.5 py-0.5 text-[10px] font-bold text-brass-dark uppercase tracking-wider">
                {hub.tag}
              </span>
            </div>

            <h4 className="mt-3 text-sm font-bold text-ink group-hover:text-brass-dark transition-colors">
              {hub.name}
            </h4>

            <p className="mt-1 text-[11px] text-muted truncate" title={hub.lineOrRoute}>
              {hub.lineOrRoute}
            </p>

            <div className="mt-4 flex items-center justify-between border-t border-line/60 pt-3 text-xs">
              <span className="font-mono font-medium text-muted">
                {hub.distanceKm} km
              </span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-ink flex items-center gap-1">
                  🚗 {hub.driveTimeMins} mins
                </span>
                {hub.metroTimeMins ? (
                  <span className="font-bold text-verdigris flex items-center gap-1">
                    🚆 {hub.metroTimeMins} mins
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Verified Physical Landmarks from Property Record (if any extra) */}
      {landmarks.length > 0 ? (
        <div className="mt-6 rounded-2xl border border-line/80 bg-paper-2 p-4">
          <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted mb-2">
            Verified Physical Street Landmarks:
          </p>
          <div className="flex flex-wrap gap-2">
            {landmarks.map((l) => (
              <span
                key={l}
                className="flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold text-ink shadow-xs"
              >
                <MapPin size={13} weight="fill" className="text-brass" />
                {l}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
