import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ChatCircleDots,
  PhoneCall,
  CalendarCheck,
  X,
  Buildings,
} from "@phosphor-icons/react";
import { SITE } from "../lib/site";

export function FloatingConcierge({ className = "" }: { className?: string } = {}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`floating-concierge fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3 print:hidden ${className}`}
      style={{ paddingBottom: "var(--safe-bottom)" }}
    >
      {/* Expanded Speed-Dial Panel */}
      {open ? (
        <div
          className="glass-card flex flex-col gap-2 rounded-2xl p-4 shadow-[0_20px_40px_-12px_rgba(18,16,14,0.28)] animate-in fade-in slide-in-from-bottom-4 duration-200"
          style={{ width: "min(288px, calc(100vw - 32px))" }}
        >
          <div className="flex items-center justify-between border-b border-line/70 pb-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-verdigris opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-verdigris" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink">
                {SITE.name} Concierge
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close concierge"
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted hover:bg-paper-2 hover:text-ink transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <p className="text-xs text-muted leading-relaxed">
            Connect directly with our luxury property advisors.
          </p>

          <div className="flex flex-col gap-2 pt-1">
            <a
              href={`${SITE.whatsapp}?text=${encodeURIComponent(`Hello, I am looking for a verified luxury property and would like expert assistance.`)}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-xl bg-verdigris px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-verdigris/90 hover:shadow cursor-pointer"
            >
              <ChatCircleDots size={20} weight="fill" />
              <span className="flex-1">WhatsApp an Advisor</span>
              <span className="text-[10px] opacity-80">Instant</span>
            </a>

            <a
              href={`tel:${SITE.phone}`}
              className="flex items-center gap-3 rounded-xl border border-line bg-paper px-4 py-3 text-sm font-semibold text-ink transition-all hover:border-brass hover:bg-paper-2 cursor-pointer"
            >
              <PhoneCall size={20} weight="fill" className="text-brass" />
              <span className="flex-1">Direct Call: {SITE.phone}</span>
            </a>

            <Link
              to="/properties"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl border border-line bg-paper px-4 py-3 text-sm font-semibold text-ink transition-all hover:border-brass hover:bg-paper-2"
            >
              <Buildings size={20} weight="fill" className="text-brass" />
              <span className="flex-1">Explore Verified Properties</span>
            </Link>

            <Link
              to="/sell"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl border border-line bg-paper px-4 py-3 text-sm font-semibold text-ink transition-all hover:border-brass hover:bg-paper-2"
            >
              <CalendarCheck size={20} weight="fill" className="text-brass" />
              <span className="flex-1">List / Value Your Property</span>
            </Link>
          </div>
        </div>
      ) : null}

      {/* Main Floating Trigger Button - larger on touch */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={`Contact ${SITE.name} Concierge`}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper shadow-[0_12px_28px_-6px_rgba(18,16,14,0.35)] transition-all duration-300 hover:scale-110 hover:bg-ink-2 active:scale-95 cursor-pointer float-subtle"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brass-2 opacity-75" />
          <span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full bg-brass text-[9px] font-bold text-ink">
            ✓
          </span>
        </span>
        {open ? (
          <X size={24} weight="bold" />
        ) : (
          <ChatCircleDots size={26} weight="duotone" className="text-brass-soft transition-transform group-hover:rotate-12" />
        )}
      </button>
    </div>
  );
}
