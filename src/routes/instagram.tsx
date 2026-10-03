import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { FooterSettingsContext } from "../components/footer-settings";
import { FloatingConcierge } from "../components/floating-concierge";
import { InstagramIcon } from "../components/instagram-icon";
import { initRevealOnScroll } from "../lib/reveal";
import { getSupabaseForRoute } from "../lib/route-supabase";
import { getSiteSettings, listReels } from "../lib/queries";
import { SITE } from "../lib/site";

export const Route = createFileRoute("/instagram")({
  loader: async () => {
    const supabase = getSupabaseForRoute();
    const [reels, settings] = await Promise.all([
      listReels(supabase),
      getSiteSettings(supabase),
    ]);
    return { reels, settings };
  },
  head: () => ({
    meta: [
      { title: "Walkthroughs & Cinema Reels · Apex Living" },
      {
        name: "description",
        content:
          "Verified architectural walkthroughs, luxury site visits, and market insights straight from our social channels.",
      },
      { property: "og:title", content: "Walkthroughs & Cinema Reels · Apex Living" },
      {
        property: "og:description",
        content:
          "Verified architectural walkthroughs, luxury site visits, and market insights straight from our social channels.",
      },
      { property: "og:image", content: "/images/properties/luxury_penthouse_terrace_1790945979055.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Walkthroughs & Cinema Reels · Apex Living" },
      { name: "twitter:image", content: "/images/properties/luxury_penthouse_terrace_1790945979055.jpg" },
    ],
  }),
  component: InstagramPage,
});

function InstagramPage() {
  const { reels, settings } = Route.useLoaderData();
  const instaUrl = settings.instagram_url || SITE.instagram;
  const instaHandle = settings.instagram_handle || SITE.instagramHandle;

  useEffect(() => {
    initRevealOnScroll();
  }, []);

  return (
    <div className="min-h-dvh bg-paper">
      <Header />
      <FloatingConcierge />
      <main className="pt-20 sm:pt-24 lg:pt-28">
        {/* Hero Section */}
        <section className="border-b border-brass/30 bg-paper-2/60">
          <div className="shell py-14 md:py-20">
            <div className="inline-flex items-center gap-2 rounded-full border border-brass/40 bg-white px-3.5 py-1 text-xs font-semibold text-ink shadow-xs mb-4">
              <InstagramIcon size={14} className="text-brass" />
              <span>Official Channel · @{instaHandle}</span>
            </div>
            <h1 className="font-display text-4xl font-medium tracking-tight text-ink md:text-5xl">
              Instagram Walkthroughs
            </h1>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
              Live on-ground walkthroughs, verified site inspections, and transparent Kolkata real estate advice.
              Tap any post to view directly on Instagram.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href={instaUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-brass/40 bg-ink px-5 py-2.5 text-xs font-semibold text-paper shadow-xs hover:bg-ink-2 hover:border-brass hover:shadow-md hover:shadow-brass/20 transition-all active:translate-y-0"
              >
                <InstagramIcon size={15} className="text-brass-2" />
                <span>Follow @{instaHandle} on Instagram</span>
                <span>↗</span>
              </a>
              <Link
                to="/properties"
                className="inline-flex items-center gap-2 rounded-full border border-brass/40 bg-white px-5 py-2.5 text-xs font-semibold text-ink hover:border-brass hover:shadow-xs transition-all"
              >
                <span>Browse All Properties</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="shell-wide py-12 sm:py-16">
          {reels.length === 0 ? (
            <div className="shell py-24 text-center text-sm text-muted">
              New walkthroughs and posts are on their way. Check back soon or follow @{instaHandle} directly on Instagram.
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-8">
                <p className="text-xs font-semibold tracking-wider uppercase text-muted">
                  Showing {reels.length} {reels.length === 1 ? "Post" : "Posts"}
                </p>
                <a
                  href={instaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-brass hover:text-ink transition-colors flex items-center gap-1"
                >
                  <span>Open Instagram Profile</span>
                  <span>↗</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                {reels.map((reel) => (
                  <a
                    key={reel.id}
                    href={reel.reel_url}
                    target="_blank"
                    rel="noreferrer"
                    className="reel-tile reveal group relative block w-full overflow-hidden rounded-2xl border-2 border-brass/50 bg-ink shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brass hover:shadow-xl hover:shadow-brass/20 hover:ring-1 hover:ring-brass/30"
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
                      <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-black/65 text-white backdrop-blur-md border border-brass/40 shadow-xs">
                        <InstagramIcon size={13} />
                      </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent p-2.5 sm:p-3.5 pt-8 sm:pt-12">
                      <p className="text-[11px] sm:text-sm font-medium leading-snug text-paper line-clamp-2">
                        {reel.title}
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-brass-2">
                        <span>Watch on Instagram</span>
                        <span className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Community / Follow Banner */}
        <section className="border-t border-brass/30 bg-paper-2/40 py-12 sm:py-16">
          <div className="shell max-w-3xl text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-ink">
              Never miss an off-market opportunity
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted max-w-xl mx-auto">
              We share preliminary walkthroughs and new developer allocations on Instagram before they are publicly listed.
            </p>
            <div className="mt-6 flex justify-center">
              <a
                href={instaUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-brass/50 bg-white px-6 py-3 text-xs font-semibold text-ink shadow-xs hover:border-brass hover:text-brass-dark hover:shadow-md hover:shadow-brass/20 hover:ring-1 hover:ring-brass/25 transition-all"
              >
                <InstagramIcon size={15} className="text-brass" />
                <span>Follow @{instaHandle}</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <FooterSettingsContext.Provider value={settings}>
        <Footer />
      </FooterSettingsContext.Provider>
    </div>
  );
}
