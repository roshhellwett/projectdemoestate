import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { MagnifyingGlass, MapPin, House, CurrencyInr, Buildings } from "@phosphor-icons/react";

interface HeroSearchProps {
  totalCount?: number;
}

export function HeroSearch({ totalCount = 0 }: HeroSearchProps) {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"residential" | "commercial" | "luxury">("residential");
  const [locality, setLocality] = useState<string>("All");
  const [bhk, setBhk] = useState<string>("");
  const [budget, setBudget] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    let searchBhk = bhk;
    if (tab === "commercial") {
      searchBhk = "commercial";
    }

    navigate({
      to: "/properties",
      search: {
        locality,
        bhk: searchBhk,
      },
    });
  };

  return (
    <div className="w-full max-w-4xl rounded-2xl border border-line/80 bg-white/90 p-4 md:p-6 shadow-[0_24px_50px_-16px_rgba(18,16,14,0.18)] backdrop-blur-xl">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 border-b border-line/60 pb-3">
        <button
          type="button"
          onClick={() => {
            setTab("residential");
            if (bhk === "commercial") setBhk("");
          }}
          className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
            tab === "residential"
              ? "bg-ink text-paper shadow-sm"
              : "text-muted hover:text-ink hover:bg-paper-2"
          }`}
        >
          <House size={14} weight={tab === "residential" ? "fill" : "regular"} />
          Buy Residence
        </button>

        <button
          type="button"
          onClick={() => {
            setTab("commercial");
            setBhk("commercial");
          }}
          className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
            tab === "commercial"
              ? "bg-ink text-paper shadow-sm"
              : "text-muted hover:text-ink hover:bg-paper-2"
          }`}
        >
          <Buildings size={14} weight={tab === "commercial" ? "fill" : "regular"} />
          Commercial & Office
        </button>

        <button
          type="button"
          onClick={() => {
            setTab("luxury");
            setBhk("4");
          }}
          className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
            tab === "luxury"
              ? "bg-ink text-paper shadow-sm"
              : "text-muted hover:text-ink hover:bg-paper-2"
          }`}
        >
          <span className="text-brass-2 font-serif">✦</span>
          Luxury & Penthouses
        </button>
      </div>

      {/* Inputs Form Bar */}
      <form onSubmit={handleSearch} className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-[1.2fr_1fr_1fr_auto]">
        {/* Locality Selector */}
        <div className="flex flex-col gap-1 rounded-xl border border-line bg-paper/60 px-3.5 py-2.5 transition-colors focus-within:border-brass focus-within:bg-white">
          <label className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-muted">
            <MapPin size={12} weight="fill" className="text-brass" /> Locality
          </label>
          <select
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            className="w-full bg-transparent text-xs font-semibold text-ink focus:outline-none cursor-pointer"
          >
            <option value="All">All Kolkata Prime Areas</option>
            <option value="Lake Town">Lake Town & Bangur</option>
            <option value="Newtown">Newtown / Action Area</option>
            <option value="Kasba">Kasba / EM Bypass</option>
            <option value="Rajarhat">Rajarhat / Chinar Park</option>
            <option value="C.R. Avenue">Central / C.R. Avenue</option>
            <option value="Garia More">Garia / South Kolkata</option>
            <option value="Konnagar">Konnagar / Urban Lakes</option>
          </select>
        </div>

        {/* BHK / Type Selector */}
        <div className="flex flex-col gap-1 rounded-xl border border-line bg-paper/60 px-3.5 py-2.5 transition-colors focus-within:border-brass focus-within:bg-white">
          <label className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-muted">
            <House size={12} weight="fill" className="text-brass" /> Configuration
          </label>
          <select
            value={bhk}
            onChange={(e) => setBhk(e.target.value)}
            disabled={tab === "commercial"}
            className="w-full bg-transparent text-xs font-semibold text-ink focus:outline-none cursor-pointer disabled:opacity-60"
          >
            {tab === "commercial" ? (
              <option value="commercial">Commercial Office Space</option>
            ) : (
              <>
                <option value="">Any Configuration</option>
                <option value="2">2 BHK Residences</option>
                <option value="3">3 BHK Premium</option>
                <option value="4">4 BHK Luxury / Duplex</option>
              </>
            )}
          </select>
        </div>

        {/* Budget Tier */}
        <div className="flex flex-col gap-1 rounded-xl border border-line bg-paper/60 px-3.5 py-2.5 transition-colors focus-within:border-brass focus-within:bg-white">
          <label className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-muted">
            <CurrencyInr size={12} weight="fill" className="text-brass" /> Price Range
          </label>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full bg-transparent text-xs font-semibold text-ink focus:outline-none cursor-pointer"
          >
            <option value="">Any Budget</option>
            <option value="under-75">Under ₹75 Lakhs</option>
            <option value="75-150">₹75 Lakhs - ₹1.50 Cr</option>
            <option value="150-plus">₹1.50 Cr & Above</option>
          </select>
        </div>

        {/* Submit Search Button */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-xl bg-ink px-6 py-3 text-xs font-bold uppercase tracking-wider text-paper shadow-md transition-all hover:bg-ink-2 hover:-translate-y-0.5 active:translate-y-0"
        >
          <MagnifyingGlass size={16} weight="bold" className="text-brass-2" />
          <span>{totalCount > 0 ? `Explore (${totalCount})` : "Explore Residences"}</span>
        </button>
      </form>
    </div>
  );
}
