import { Link } from "@tanstack/react-router";
import type { Partner, Reel, Testimonial } from "../lib/types";
import { InstagramIcon } from "./instagram-icon";

/**
 * Partner logo wall: marquee of the client's real partner logos
 * (public/images/partners/*). Logos only - no category labels.
 * Duplicated track content keeps the loop seamless.
 */
export function PartnerWall({ partners }: { partners: Partner[] }) {
  if (partners.length === 0) return null;
  const row = [...partners, ...partners];
  return (
    <section aria-label="Our partners" className="border-y border-brass/25 bg-paper-2/70 py-14">
      <div className="shell-wide">
        <h2 className="reveal text-center font-display text-xl font-medium tracking-tight text-ink md:text-2xl">
          Builders and brands we work with
        </h2>
        <div className="marquee reveal mt-10" aria-hidden={false}>
          <ul className="marquee-track items-center gap-16 px-8">
            {row.map((p, i) => (
              <li key={`${p.id}-${i}`} className="shrink-0 py-2">
                {p.website_url ? (
                  <a href={p.website_url} target="_blank" rel="noreferrer" title={p.name} className="block">
                    <PartnerLogo partner={p} />
                  </a>
                ) : (
                  <span title={p.name} className="block">
                    <PartnerLogo partner={p} />
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function PartnerLogo({ partner }: { partner: Partner }) {
  return (
    <img
      src={partner.logo_url}
      alt={partner.name}
      width={220}
      height={70}
      decoding="async"
      className="h-12 w-auto object-contain opacity-70 transition-all duration-500 hover:opacity-100 md:h-14"
    />
  );
}

/**
 * Instagram reels & posts section. Admin pastes links in the dashboard.
 * Compact luxury tiles with golden rounded borders.
 * Click opens the post directly on Instagram.
 */
export function ReelsSection({ reels, instagram }: { reels: Reel[]; instagram: string }) {
  if (reels.length === 0) return null;
  return (
    <section aria-label="Instagram reels" className="shell-wide py-14 sm:py-20 md:py-24">
      <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
        <div>
          <p className="eyebrow text-brass">Verified Social Feed</p>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-medium tracking-tight text-ink md:text-4xl">
            Straight from our Instagram
          </h2>
          <p className="mt-2.5 max-w-md text-sm text-muted">
            Walkthroughs and site visits, as posted. Tap any to watch on Instagram.
          </p>
        </div>
        <div className="flex items-center gap-5">
          <Link
            to="/instagram"
            className="text-sm font-semibold text-brass transition-colors hover:text-ink"
          >
            All posts →
          </Link>
          <a
            href={instagram}
            target="_blank"
            rel="noreferrer"
            className="hidden shrink-0 text-sm font-semibold text-brass transition-colors hover:text-ink sm:block"
          >
            Follow @sspropertykol →
          </a>
        </div>
      </div>
      <div className="mt-6 sm:mt-10 flex flex-wrap gap-4 sm:gap-6">
        {reels.map((reel) => (
          <a
            key={reel.id}
            href={reel.reel_url}
            target="_blank"
            rel="noreferrer"
            className="reel-tile reveal group relative block w-full max-w-[240px] sm:max-w-[260px] overflow-hidden rounded-2xl border-2 border-brass/50 bg-ink shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brass hover:shadow-xl hover:shadow-brass/20 hover:ring-1 hover:ring-brass/30 shrink-0"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink-2">
              <img
                src={reel.cover_thumb || reel.cover_image}
                alt={reel.title}
                width={360}
                height={450}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/65 text-white backdrop-blur-md border border-brass/40 shadow-xs">
                <InstagramIcon size={14} />
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent p-3.5 pt-12">
              <p className="text-xs sm:text-sm font-medium leading-snug text-paper line-clamp-2">{reel.title}</p>
              <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-brass-2">
                <span>Watch on Instagram</span>
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/**
 * Testimonials: what buyers and sellers said. Max 3 lines per quote.
 */
export function TestimonialStrip({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;
  return (
    <section aria-label="Client testimonials" className="shell py-14 sm:py-20 md:py-24">
      <h2 className="reveal font-display text-2xl sm:text-3xl font-medium tracking-tight text-ink md:text-4xl">
        What our clients say
      </h2>
      <div className="mt-6 sm:mt-10 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {testimonials.slice(0, 6).map((t) => (
          <figure
            key={t.id}
            className="reveal flex h-full flex-col justify-between rounded-[var(--radius-card)] border border-brass/35 bg-white p-5 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brass hover:shadow-md hover:shadow-brass/10 hover:ring-1 hover:ring-brass/20"
          >
            <blockquote className="text-[15px] leading-relaxed text-ink/80">
              <span aria-hidden="true" className="font-display text-3xl leading-none text-brass">“</span>
              {t.review_text.length > 220 ? `${t.review_text.slice(0, 217).trimEnd()}…` : t.review_text}
            </blockquote>
            <figcaption className="mt-6">
              <p className="text-sm font-semibold text-ink">{t.client_name}</p>
              <p className="mt-0.5 text-xs text-muted">{t.client_location || "Kolkata"}</p>
              {t.review_date ? (
                <p className="mt-2 text-[11px] font-medium tracking-wide text-brass">
                  {"★".repeat(Math.min(5, Math.max(1, t.rating)))}
                </p>
              ) : null}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
