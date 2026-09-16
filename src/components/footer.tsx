import { Link } from "@tanstack/react-router";
import { LogoImage } from "./brand";
import { useFooterSettings } from "./footer-settings";
import { FOOTER_SERVICES, NAV_LINKS, SITE } from "../lib/site";

/**
 * Footer. Mobile-first: single column with proper spacing, then 4-col grid on desktop.
 * Contact links/socials/footer note come from admin-editable site settings.
 */
export function Footer() {
  const settings = useFooterSettings() ?? {};
  const phone = settings.phone ?? SITE.phone;
  const phoneHref = `tel:${phone.replace(/[^\d+]/g, "")}`;
  const email = settings.email ?? SITE.email;
  const city = settings.city ?? SITE.city;
  const instagram = settings.instagram_url ?? SITE.instagram;
  const facebook = settings.facebook_url ?? SITE.facebook;
  const youtube = settings.youtube_url ?? SITE.youtube;
  const footerNote = settings.footer_note ?? "Verified listings. Transparent pricing. No hidden charges.";

  return (
    <footer className="border-t border-line-dark bg-ink text-paper">
      <div className="shell-wide grid gap-8 sm:gap-10 lg:gap-12 py-12 sm:py-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <LogoImage dark className="h-9 sm:h-10" />
          <p className="mt-3 sm:mt-4 max-w-xs text-sm leading-relaxed text-paper/60">
            Verified homes and commercial spaces across Kolkata. Lake Town, Newtown, Kasba, Rajarhat and
            greater Kolkata.
          </p>
        </div>

        <div>
          <h3 className="eyebrow text-brass-2">Explore</h3>
          <ul className="mt-3 sm:mt-4 space-y-2.5 sm:space-y-3 text-sm">
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
          <ul className="mt-3 sm:mt-4 space-y-2.5 sm:space-y-3 text-sm">
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
          <ul className="mt-3 sm:mt-4 space-y-2.5 sm:space-y-3 text-sm text-paper/70">
            <li>
              <a href={phoneHref} className="transition-colors hover:text-paper">
                {phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${email}`} className="transition-colors hover:text-paper break-all">
                {email}
              </a>
            </li>
            <li>{city}</li>
          </ul>
          <div className="mt-5 sm:mt-6 flex gap-4 text-sm font-medium">
            <a href={instagram} target="_blank" rel="noreferrer" className="text-paper/60 hover:text-paper transition-colors">
              Instagram
            </a>
            <a href={facebook} target="_blank" rel="noreferrer" className="text-paper/60 hover:text-paper transition-colors">
              Facebook
            </a>
            <a href={youtube} target="_blank" rel="noreferrer" className="text-paper/60 hover:text-paper transition-colors">
              YouTube
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-line-dark">
        <div
          className="shell-wide flex flex-col items-center justify-between gap-2 sm:gap-3 py-5 sm:py-6 text-xs text-paper/50 sm:flex-row"
          style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
        >
          <p>© {new Date().getFullYear()} SS Property. All rights reserved.</p>
          <p>{footerNote}</p>
        </div>
      </div>
    </footer>
  );
}
