import type { Partner, Reel, Testimonial } from "../lib/types";

/**
 * Partner logo wall: marquee of the client's real partner logos
 * (public/images/partners/*). Logos only - no category labels.
 * Duplicated track content keeps the loop seamless.
 */
export function PartnerWall({ partners }: { partners: Partner[] }) {
  if (partners.length === 0) return null;
  const row = [...partners, ...partners];
  return (
    <section aria-label="Our partners" className="border-y border-line bg-paper-2/70 py-14">
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
 * Instagram reels section. Admin pastes reel links in the dashboard;
 * they render ONLY here - nowhere else on the site.
 * Click opens the reel on Instagram (covers stay fast, no embeds by default).
 */
export function ReelsSection({ reels, instagram }: { reels: Reel[]; instagram: string }) {
  if (reels.length === 0) return null;
  return (
    <section aria-label="Instagram reels" className="shell-wide py-20 md:py-28">
      <div className="reveal flex items-end justify-between gap-6">
        <div>
          <h2 className="font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">
            Straight from our Instagram
          </h2>
          <p className="mt-3 max-w-md text-sm text-muted">
            Walkthroughs and site visits, as posted. Tap any to watch on Instagram.
          </p>
        </div>
        <a
          href={instagram}
          target="_blank"
          rel="noreferrer"
          className="hidden shrink-0 text-sm font-semibold text-brass transition-colors hover:text-ink sm:block"
        >
          Follow @sspropertykol →
        </a>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {reels.map((reel) => (
          <a
            key={reel.id}
            href={reel.reel_url}
            target="_blank"
            rel="noreferrer"
            className="reel-tile reveal group relative block overflow-hidden rounded-2xl border border-line bg-ink"
          >
            <img
              src={reel.cover_thumb || reel.cover_image}
              alt={reel.title}
              width={400}
              height={500}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent p-4 pt-14">
              <p className="text-sm font-medium leading-snug text-paper">{reel.title}</p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-paper/70">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
                </svg>
                Watch on Instagram
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
    <section aria-label="Client testimonials" className="shell py-20 md:py-24">
      <h2 className="reveal font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">
        What our clients say
      </h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {testimonials.slice(0, 6).map((t) => (
          <figure
            key={t.id}
            className="reveal flex h-full flex-col justify-between rounded-[var(--radius-card)] border border-line bg-white p-7"
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
