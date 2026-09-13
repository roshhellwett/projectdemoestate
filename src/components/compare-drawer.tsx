import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useCompare } from "../lib/compare";
import { formatPrice } from "../lib/format";
import {
  Scales,
  X,
  CaretUp,
  CaretDown,
  ArrowRight,
  Trash,
} from "@phosphor-icons/react";

export function CompareDrawer() {
  const { items, count, removeItem, clear } = useCompare();
  const [collapsed, setCollapsed] = useState(false);

  if (count === 0) return null;

  return (
    <div
      id="compare-floating-drawer"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-4xl transition-all duration-300 animate-in slide-in-from-bottom-6"
    >
      <div className="overflow-hidden rounded-2xl border border-brass/40 bg-ink/95 text-paper shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        {/* Header Ribbon */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-brass text-ink font-bold">
              <Scales size={14} weight="fill" />
            </div>
            <span className="font-semibold text-paper">
              Compare Residences ({count} of 4 selected)
            </span>
            <span className="hidden sm:inline text-white/50 text-[11px]">
              • Side-by-side architectural specs & West Bengal fees
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={clear}
              className="flex items-center gap-1 text-[11px] text-white/60 hover:text-white transition-colors"
            >
              <Trash size={12} />
              <span className="hidden sm:inline">Clear</span>
            </button>
            <button
              type="button"
              onClick={() => setCollapsed(!collapsed)}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label={collapsed ? "Expand drawer" : "Collapse drawer"}
            >
              {collapsed ? <CaretUp size={13} /> : <CaretDown size={13} />}
            </button>
          </div>
        </div>

        {/* Content Body (collapsible) */}
        {!collapsed && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4">
            {/* Properties Thumbnails Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto flex-1">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="relative flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 p-2 pr-6 hover:border-brass/50 transition-colors"
                >
                  <img
                    src={item.main_image_thumb || item.main_image}
                    alt={item.title}
                    className="h-10 w-10 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-paper">
                      {item.title}
                    </p>
                    <p className="text-[11px] font-bold text-brass">
                      {formatPrice(item.price_inr, item.price_display)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.title}`}
                    className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-danger hover:text-white transition-colors"
                  >
                    <X size={10} />
                  </button>
                </div>
              ))}

              {/* Empty slot placeholders up to 4 */}
              {Array.from({ length: Math.max(0, 4 - items.length) }).map((_, idx) => (
                <div
                  key={`empty-${idx}`}
                  className="hidden sm:flex items-center justify-center rounded-xl border border-dashed border-white/15 p-2 text-[11px] text-white/40"
                >
                  + Add property
                </div>
              ))}
            </div>

            {/* Action CTA Button */}
            <div className="flex w-full md:w-auto shrink-0 justify-end">
              <Link
                to="/compare"
                className="flex w-full md:w-auto items-center justify-center gap-2 rounded-full bg-brass-gradient px-6 py-3 text-xs font-bold uppercase tracking-wider text-ink shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                <span>Compare Specs ({count})</span>
                <ArrowRight size={14} weight="bold" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
