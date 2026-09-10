/**
 * Brand monogram - inline SVG, matches the client's favicon mark.
 * A hand-rolled mark is allowed here: single, simple, geometric.
 */
export function Monogram({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <rect x="1" y="1" width="38" height="38" rx="10" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <path
        d="M12 27.5c2.2 1.6 4.6 2.3 7 2.3 3.8 0 6.2-1.7 6.2-4.4 0-2.5-1.8-3.8-6.3-4.9-3.9-1-5.4-2-5.4-3.8 0-2 1.9-3.4 4.8-3.4 2 0 4 .6 5.8 1.8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Wordmark with monogram. */
export function Wordmark({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Monogram className={`h-9 w-9 ${dark ? "text-paper" : "text-ink"}`} />
      <span className={`font-display text-xl font-semibold tracking-tight ${dark ? "text-paper" : "text-ink"}`}>
        SS Property
      </span>
    </span>
  );
}
