import { useState, useEffect } from "react";
import { Sparkle, X, ArrowSquareOut } from "@phosphor-icons/react";
import { SITE } from "../lib/site";

export function DemoBanner() {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("demo_banner_dismissed") === "1") {
        setDismissed(true);
      }
    } catch {
      // ignore in SSR
    }
  }, []);

  if (!SITE.isDemo || dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem("demo_banner_dismissed", "1");
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative z-50 bg-gradient-to-r from-ink via-[#1f1b16] to-ink text-paper border-b border-brass/40 px-3 py-2 text-xs">
      <div className="shell-wide flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brass/25 text-brass-2">
            <Sparkle size={12} weight="fill" />
          </span>
          <p className="truncate text-[11px] sm:text-xs text-paper/90">
            <strong className="text-brass-2 font-bold uppercase tracking-wider mr-1">Agency Demo:</strong>
            Fully customizable luxury real estate platform — ready to ship with your agency name, logo, colors & verified inventory.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <a
            href="mailto:zenithprojects@icloud.com?subject=Agency%20Website%20Demo%20Inquiry&body=Hi%20Zenith%20Projects%2C%0A%0AI%20am%20interested%20in%20customizing%20this%20luxury%20real%20estate%20platform%20for%20my%20agency."
            className="inline-flex items-center gap-1 rounded-full bg-brass px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] font-bold text-ink hover:bg-brass-2 transition-colors cursor-pointer"
          >
            <span className="sm:hidden">Claim</span>
            <span className="hidden sm:inline">Claim This Template</span>
            <ArrowSquareOut size={12} weight="bold" />
          </a>
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss banner"
            className="flex h-6 w-6 items-center justify-center rounded-full text-paper/60 hover:text-paper hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
