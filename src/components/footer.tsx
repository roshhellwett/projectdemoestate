import { Link } from "@tanstack/react-router";
import { LogoImage } from "./brand";
import { useFooterSettings } from "./footer-settings";
import { FOOTER_SERVICES, NAV_LINKS, SITE } from "../lib/site";

/**
 * Footer. Contact links/socials/footer note come from admin-editable site
 * settings (via FooterSettingsContext) with recovered defaults as fallback.
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
      <div className="shell-wide grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <LogoImage dark className="h-10" />
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
              <a href={phoneHref} className="transition-colors hover:text-paper">
                {phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${email}`} className="transition-colors hover:text-paper">
                {email}
              </a>
            </li>
            <li>{city}</li>
          </ul>
          <div className="mt-6 flex gap-4 text-xs font-medium">
            <a href={instagram} target="_blank" rel="noreferrer" className="text-paper/60 hover:text-paper">
              Instagram
            </a>
            <a href={facebook} target="_blank" rel="noreferrer" className="text-paper/60 hover:text-paper">
              Facebook
            </a>
            <a href={youtube} target="_blank" rel="noreferrer" className="text-paper/60 hover:text-paper">
              YouTube
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-line-dark">
        <div className="shell-wide flex flex-col items-center justify-between gap-3 py-6 text-xs text-paper/50 sm:flex-row">
          <p>© {new Date().getFullYear()} SS Property. All rights reserved.</p>
          <p>{footerNote}</p>
        </div>
      </div>
    </footer>
  );
}
