import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { FooterSettingsContext } from "../components/footer-settings";
import { PropertyCard } from "../components/property-card";
import { PartnerWall, ReelsSection, TestimonialStrip } from "../components/sections";
import { initRevealOnScroll } from "../lib/reveal";
import { formatDate } from "../lib/format";
import { getSupabaseForRoute } from "../lib/route-supabase";
import { applySettings } from "../lib/site";
import { listBlogPosts, listFaqs, listPartners, listProperties, listPublishedTestimonials, listReels, getSiteSettings } from "../lib/queries";
import type { Faq, Property } from "../lib/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SS Property - Premium Real Estate in Kolkata" },
      {
        name: "description",
        content:
          "Verified flats, penthouses and commercial spaces across Kolkata. Lake Town, Newtown, Kasba, Rajarhat and more.",
      },
    ],
  }),
  loader: async () => {
    const supabase = getSupabaseForRoute();
    const [featured, latest, reels, posts, faqs, testimonials, partners, settings] = await Promise.all([
      listProperties(supabase, { featuredOnly: true, limit: 3 }),
      listProperties(supabase, { limit: 6 }),
      listReels(supabase),
      listBlogPosts(supabase, 3),
      listFaqs(supabase),
      listPublishedTestimonials(supabase),
      listPartners(supabase),
      getSiteSettings(supabase),
    ]);
    return {
      featured,
      latest,
      reels,
      posts,
      faqs,
      testimonials,
      partners,
      settings,
      site: applySettings(settings),
    };
  },
  component: HomePage,
});

function HomePage() {
  const { featured, latest, reels, posts, faqs, testimonials, partners, settings, site } =
    Route.useLoaderData();

  useEffect(() => {
    initRevealOnScroll();
  }, []);

  // hero copy: admin-editable via settings, split into 2 masked lines
  const heroTitle = settings.hero_title ?? "Homes worth the grand tour.";
  const [line1, line2 = ""] = heroTitle.split("\n").length > 1
    ? heroTitle.split("\n")
    : heroTitle.split(". ").length > 1
      ? [`${heroTitle.split(". ")[0]}.`, heroTitle.split(". ").slice(1).join(". ")]
      : [heroTitle, ""];
  const lastWordItalic = (line: string) => {
    if (!line) return null;
    const words = line.trim().split(" ");
    const last = words.pop()!;
    return (
      <>
        {words.join(" ")} <em className="italic">{last}</em>
      </>
    );
  };

  return (
    <div className="min-h-dvh">
      <Header />
      <main>
        {/* ---------------- hero ---------------- */}
        <section className="relative flex min-h-[92dvh] items-center overflow-hidden pt-16">
          {/* backdrop */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-paper-2/70 via-paper to-paper" />
            <div className="hero-glow absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-brass-ghost blur-3xl" />
          </div>

          <div className="shell-wide grid items-center gap-14 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
            <div>
              <p className="eyebrow reveal">{settings.hero_eyebrow ?? "Kolkata · Verified Listings"}</p>
              <h1 className="mt-5 font-display text-[clamp(2.75rem,6vw,5rem)] font-medium leading-[1.05] tracking-tight text-ink">
                <span className="hero-line"><span>{line1}</span></span>
                {line2 ? <span className="hero-line"><span>{lastWordItalic(line2)}</span></span> : null}
              </h1>
              <p className="reveal mt-6 max-w-md text-[15px] leading-relaxed text-muted">
                {settings.hero_subtitle ??
                  "Hand-verified flats, penthouses and commercial spaces across Kolkata. Every listing walked through, every paper checked."}
              </p>
              <div className="reveal mt-9 flex flex-wrap items-center gap-4">
                <Link
                  to="/properties"
                  className="rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition-transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Browse Properties
                </Link>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-ink/20 px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink/50"
                >
                  Talk to Us
                </a>
              </div>
            </div>

            {/* hero visual: featured listing card cluster */}
            <div className="reveal relative hidden lg:block">
              <HeroCluster properties={featured} />
            </div>
          </div>
        </section>

        {/* ---------------- partner logo wall ---------------- */}
        <PartnerWall partners={partners} />

        {/* ---------------- featured residences ---------------- */}
        <section className="shell-wide py-20 md:py-28">
          <div className="reveal flex items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">
                Featured residences
              </h2>
              <p className="mt-3 max-w-md text-sm text-muted">
                The pick of this season across Lake Town, Newtown and Kasba.
              </p>
            </div>
            <Link
              to="/properties"
              className="hidden shrink-0 text-sm font-semibold text-brass transition-colors hover:text-ink sm:block"
            >
              View all →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.slice(0, 3).map((p) => (
              <div key={p.id} className="reveal">
                <PropertyCard property={p} priority />
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- latest listings strip ---------------- */}
        {latest.length > 3 ? (
          <section className="border-y border-line bg-paper-2 py-20">
            <div className="shell-wide">
              <h2 className="reveal font-display text-2xl font-medium tracking-tight text-ink md:text-3xl">
                Fresh on the market
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {latest.slice(3, 6).map((p) => (
                  <div key={p.id} className="reveal">
                    <PropertyCard property={p} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* ---------------- instagram reels (admin-managed) ---------------- */}
        <ReelsSection reels={reels} instagram={site.instagram} />

        {/* ---------------- testimonials ---------------- */}
        <TestimonialStrip testimonials={testimonials} />

        {/* ---------------- journal ---------------- */}
        {posts.length > 0 ? (
          <section className="border-t border-line bg-ink py-20 text-paper md:py-28">
            <div className="shell-wide">
              <div className="reveal flex items-end justify-between gap-6">
                <h2 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
                  From the journal
                </h2>
                <Link
                  to="/journal"
                  className="hidden shrink-0 text-sm font-semibold text-brass-2 transition-colors hover:text-paper sm:block"
                >
                  All articles →
                </Link>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    to="/journal/$slug"
                    params={{ slug: post.slug }}
                    className="reveal group block rounded-[var(--radius-card)] border border-line-dark bg-ink-2 p-6 transition-colors hover:border-brass/40"
                  >
                    <time className="text-xs text-paper/50">{formatDate(post.publish_date)}</time>
                    <h3 className="mt-3 font-display text-xl font-medium leading-snug transition-colors group-hover:text-brass-2">
                      {post.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-paper/60">
                      {post.excerpt || post.content.slice(0, 140)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* ---------------- faq ---------------- */}
        {faqs.length > 0 ? (
          <section className="shell py-20 md:py-24">
            <h2 className="reveal font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">
              Questions, answered
            </h2>
            <FaqList faqs={faqs} />
          </section>
        ) : null}

        {/* ---------------- cta band ---------------- */}
        <section className="shell-wide pb-24">
          <div className="reveal relative overflow-hidden rounded-[var(--radius-card)] bg-ink px-8 py-16 text-center text-paper md:py-20">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brass/20 blur-3xl" />
            <h2 className="relative font-display text-3xl font-medium tracking-tight md:text-5xl">
              {settings.cta_title ?? "Selling? We put your property in front of the right buyers."}
            </h2>
            <p className="relative mx-auto mt-4 max-w-md text-sm text-paper/60">
              {settings.cta_subtitle ?? "Fair valuation, verified footfalls, zero pressure."}
            </p>
            <Link
              to="/sell"
              className="relative mt-8 inline-flex rounded-full bg-paper px-7 py-3.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              List Your Property
            </Link>
          </div>
        </section>
      </main>
      <FooterSettingsContext.Provider value={settings}>
        <Footer />
      </FooterSettingsContext.Provider>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function HeroCluster({ properties }: { properties: Property[] }) {
  const p1 = properties[0];
  const p2 = properties[1];
  return (
    <div className="relative">
      {p1 ? (
        <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-white shadow-[0_32px_64px_-24px_rgba(18,16,14,0.25)]">
          <img
            src={p1.main_image}
            alt={p1.title}
            width={800}
            height={600}
            className="aspect-[4/3] w-full object-cover"
          />
          <div className="flex items-center justify-between p-5">
            <div>
              <p className="font-display text-lg font-semibold text-ink">{p1.locality}</p>
              <p className="text-xs text-muted">{p1.bhk_type}</p>
            </div>
            <span className="text-sm font-semibold text-brass">Featured</span>
          </div>
        </div>
      ) : null}
      {p2 ? (
        <div className="absolute -bottom-10 -left-10 hidden w-64 rotate-[-4deg] overflow-hidden rounded-2xl border-4 border-paper shadow-xl xl:block">
          <img
            src={p2.main_image_thumb || p2.main_image}
            alt={p2.title}
            width={256}
            height={192}
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
      ) : null}
    </div>
  );
}

function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="mt-8 grid gap-4 md:grid-cols-2">
      {faqs.map((f) => (
        <details key={f.id} className="reveal group rounded-[var(--radius-input)] border border-line bg-white p-5 open:bg-paper-2">
          <summary className="cursor-pointer list-none text-[15px] font-semibold text-ink marker:hidden">
            <span className="flex items-center justify-between gap-4">
              {f.question}
              <span className="text-brass transition-transform group-open:rotate-45">+</span>
            </span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-muted">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}
