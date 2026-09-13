import { Link } from "@tanstack/react-router";

/**
 * Brand lockup. Uses the client's real logo (public/images/ss-logo-*.webp):
 * - default: ink + brass recolor for the cream header
 * - dark:    paper + brass recolor for the ink footer
 * Height-normalized so the lockup sits on the text baseline.
 */
export function LogoImage({ className = "h-9", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <img
      src={dark ? "/images/ss-logo-paper.webp" : "/images/ss-logo-ink.webp"}
      alt="SS Property"
      width={406}
      height={95}
      className={`${className} w-auto`}
    />
  );
}

/** Full logo, links home. */
export function Wordmark({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <Link to="/" aria-label="SS Property home" className={`inline-flex items-center ${className}`}>
      <LogoImage dark={dark} className="h-8 md:h-9" />
    </Link>
  );
}
