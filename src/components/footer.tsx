import { Link } from "@tanstack/react-router";
import { Monogram } from "./brand";
import { FOOTER_SERVICES, NAV_LINKS, SITE } from "../lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line-dark bg-ink text-paper">
      <div className="shell-wide grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <Monogram className="h-9 w-9 text-brass-2" />
            <span className="font-display text-xl font-semibold">SS Property</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/60">
            Verified homes and commercial spaces across Kolkata. Lake Town, Newtown, Kasba, Rajarhat and
            greater Kolkata.
          </p>
        </div>

        <div>
          <h3 className="eyebrow text-brass-2">Explore</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-paper/70 transition-colors hover:text-paper">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-brass-2">Services</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {FOOTER_SERVICES.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-paper/70 transition-colors hover:text-paper">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-brass-2">Get in Touch</h3>
          <ul className="mt-4 space-y-3 text-sm text-paper/70">
            <li>
              <a href={SITE.phoneHref} className="transition-colors hover:text-paper">
                {SITE.phone}
              </a>
            </li>
            <li>
              <a href={SITE.emailHref} className="transition-colors hover:text-paper">
                {SITE.email}
              </a>
            </li>
            <li>{SITE.city}</li>
          </ul>
          <div className="mt-6 flex gap-4 text-xs font-medium">
            <a href={SITE.instagram} target="_blank" rel="noreferrer" className="text-paper/60 hover:text-paper">
              Instagram
            </a>
            <a href={SITE.facebook} target="_blank" rel="noreferrer" className="text-paper/60 hover:text-paper">
              Facebook
            </a>
            <a href={SITE.youtube} target="_blank" rel="noreferrer" className="text-paper/60 hover:text-paper">
              YouTube
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-line-dark">
        <div className="shell-wide flex flex-col items-center justify-between gap-3 py-6 text-xs text-paper/50 sm:flex-row">
          <p>© {new Date().getFullYear()} SS Property. All rights reserved.</p>
          <p>Verified listings. Transparent pricing. No hidden charges.</p>
        </div>
      </div>
    </footer>
  );
}
