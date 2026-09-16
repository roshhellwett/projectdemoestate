import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { MagnifyingGlass, X, MapPin, ArrowRight } from "@phosphor-icons/react";
import { getSupabaseBrowser } from "../lib/supabase";
import { listProperties } from "../lib/queries";
import type { Property } from "../lib/types";
import { formatArea, formatPrice } from "../lib/format";

interface SpotlightSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_CHIPS = [
  { label: "Lake Town & Bangur", query: "Lake Town" },
  { label: "New Town AA-I & II", query: "Newtown" },
  { label: "Kasba EM Bypass", query: "Kasba" },
  { label: "Terrace & Penthouse", query: "Terrace" },
  { label: "Under ₹75 Lakhs", query: "Under 75" },
  { label: "3 BHK Luxury", query: "3 BHK" },
];

export function SpotlightSearch({ isOpen, onClose }: SpotlightSearchProps) {
  const [query, setQuery] = useState("");
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleClose = () => {
    setQuery("");
    setSelectedIndex(0);
    onClose();
  };

  // Load properties once when opened
  useEffect(() => {
    if (!isOpen) return;

    // Focus input on open
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    let active = true;
    if (properties.length === 0) {
      Promise.resolve().then(() => {
        if (active) setLoading(true);
      });
      const supabase = getSupabaseBrowser();
      listProperties(supabase, { limit: 50 })
        .then((data) => {
          if (active) {
            setProperties(data);
            setLoading(false);
          }
        })
        .catch(() => {
          if (active) setLoading(false);
        });
    }

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [isOpen, properties.length]);

  // Lock body scroll when open
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Filter properties in memory based on query
  const filtered = useMemo(() => {
    if (!query.trim()) {
      // Return top 8 featured or recent properties as defaults
      return properties.slice(0, 8);
    }

    const q = query.toLowerCase().trim();
    return properties.filter((p) => {
      if (q === "under 75" || q === "under 75 lakhs" || q === "under 75l") {
        return p.price_inr && p.price_inr <= 7500000;
      }
      return (
        p.title.toLowerCase().includes(q) ||
        p.locality.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.bhk_type.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    });
  }, [properties, query]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      const target = filtered[selectedIndex];
      handleClose();
      navigate({ to: `/property/$slug`, params: { slug: target.slug } });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="spotlight-search-modal"
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-14 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-2xl rounded-3xl border border-line bg-white shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-line px-5 py-4 bg-paper/50">
          <MagnifyingGlass size={22} weight="bold" className="text-brass mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search by locality, project name, 2/3 BHK, or budget…"
            className="w-full bg-transparent text-base font-medium text-ink placeholder:text-muted outline-hidden"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="rounded-full p-1 text-muted hover:text-ink mr-2"
              title="Clear search"
            >
              <X size={16} />
            </button>
          ) : null}
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full border border-line bg-white px-2.5 py-1 text-xs font-semibold text-muted hover:text-ink transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-2 overflow-x-auto px-5 py-3 border-b border-line/60 bg-paper-2/40 text-xs scrollbar-none">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted shrink-0">
            Presets:
          </span>
          {PRESET_CHIPS.map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={() => {
                setQuery(chip.query);
                setSelectedIndex(0);
              }}
              className="rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold text-ink whitespace-nowrap hover:border-brass hover:text-brass-dark transition-colors"
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5 scrollbar-thin">
          {loading ? (
            <div className="py-12 text-center text-sm text-muted">
              <p>Scanning Kolkata luxury residences…</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted">
              <p>No verified properties found matching "{query}".</p>
              <p className="mt-1 text-xs">Try searching for "Lake Town", "Newtown", or "3 BHK".</p>
            </div>
          ) : (
            filtered.map((p, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={p.id}
                  onClick={() => {
                    onClose();
                    navigate({ to: `/property/$slug`, params: { slug: p.slug } });
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between gap-4 rounded-2xl p-3 cursor-pointer transition-all ${
                    isSelected
                      ? "bg-brass/10 border border-brass/40 shadow-xs"
                      : "hover:bg-paper border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3.5 overflow-hidden">
                    <img
                      src={p.main_image_thumb || p.main_image}
                      alt={p.title}
                      className="h-14 w-14 shrink-0 rounded-xl object-cover"
                    />
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-ink px-2 py-0.5 text-[10px] font-bold text-paper">
                          {p.bhk_type}
                        </span>
                        <span className="text-[11px] font-semibold text-muted flex items-center gap-1">
                          <MapPin size={12} weight="fill" className="text-brass" />
                          {p.locality}
                        </span>
                      </div>
                      <p className="mt-1 truncate text-sm font-bold text-ink">
                        {p.title}
                      </p>
                      <div className="mt-0.5 flex items-center gap-3 text-xs text-muted">
                        <span>{formatArea(p.area_sqft)}</span>
                        {p.facing ? <span>• {p.facing} Facing</span> : null}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-display text-base font-bold text-ink">
                      {formatPrice(p.price_inr, p.price_display)}
                    </span>
                    <div className="mt-1 flex items-center justify-end gap-1 text-xs font-bold text-brass">
                      <span>View</span>
                      <ArrowRight size={13} weight="bold" />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info bar */}
        <div className="border-t border-line px-5 py-2.5 bg-paper text-[11px] text-muted flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>Use <kbd className="rounded border bg-white px-1 font-mono">↑</kbd> <kbd className="rounded border bg-white px-1 font-mono">↓</kbd> to navigate</span>
            <span><kbd className="rounded border bg-white px-1 font-mono">Enter</kbd> to open</span>
          </div>
          <span>Showing {filtered.length} verified listings</span>
        </div>
      </div>
    </div>
  );
}
