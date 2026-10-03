import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { FooterSettingsContext } from "../components/footer-settings";
import { FloatingConcierge } from "../components/floating-concierge";
import { initRevealOnScroll } from "../lib/reveal";
import { getSupabaseForRoute } from "../lib/route-supabase";
import { getSiteSettings, listBlogPosts } from "../lib/queries";
import { formatDate } from "../lib/format";

export const Route = createFileRoute("/journal/")({
  loader: async () => {
    const supabase = getSupabaseForRoute();
    const [posts, settings] = await Promise.all([
      listBlogPosts(supabase),
      getSiteSettings(supabase),
    ]);
    return { posts, settings };
  },
  head: () => ({
    meta: [
      { title: "Journal · Architectural & Market Intelligence · Apex Living" },
      { name: "description", content: "Market notes, buyer dossiers, and strategic advice on luxury real estate." },
      { property: "og:title", content: "The Journal · Apex Living" },
      { property: "og:description", content: "Market notes, buyer dossiers, and strategic advice on luxury real estate." },
      { property: "og:image", content: "/images/properties/luxury_penthouse_terrace_1790945979055.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "The Journal · Apex Living" },
      { name: "twitter:image", content: "/images/properties/luxury_penthouse_terrace_1790945979055.jpg" },
    ],
  }),
  component: JournalPage,
});

function JournalPage() {
  const { posts, settings } = Route.useLoaderData();

  useEffect(() => {
    initRevealOnScroll();
  }, []);

  const [lead, ...rest] = posts;

  return (
    <div className="min-h-dvh bg-paper">
      <Header />
      <FloatingConcierge />
      <main className="pt-20 sm:pt-24 lg:pt-28">
        <section className="border-b border-line bg-paper-2/60">
          <div className="shell py-14 md:py-20">
            <p className="eyebrow text-brass">Notes from the ground</p>
            <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-ink md:text-5xl">
              The Journal
            </h1>
            <p className="mt-3 max-w-md text-sm text-muted">
              {settings.journal_intro ??
                "Buyer guides, market notes and honest advice on Kolkata real estate."}
            </p>
          </div>
        </section>

        {posts.length === 0 ? (
          <div className="shell py-24 text-center text-sm text-muted">
            Articles are on their way. Check back soon.
          </div>
        ) : (
          <section className="shell-wide py-12">
            {lead ? (
              <Link
                to="/journal/$slug"
                params={{ slug: lead.slug }}
                className="reveal group grid gap-8 rounded-2xl sm:rounded-3xl border border-brass/60 bg-white/70 p-6 sm:p-8 lg:p-10 shadow-xs transition-all duration-300 hover:border-brass hover:shadow-lg md:grid-cols-2"
              >
                <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-brass/30 bg-paper-2">
                  <img
                    src={lead.cover_thumb || lead.cover_image}
                    alt={lead.title}
                    width={800}
                    height={500}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <time className="text-xs font-medium text-brass-dark">{formatDate(lead.publish_date)}</time>
                  <h2 className="mt-3 font-display text-2xl font-medium leading-snug text-ink transition-colors group-hover:text-brass md:text-3xl lg:text-4xl">
                    {lead.title}
                  </h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
                    {lead.excerpt || lead.content.slice(0, 200)}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brass group-hover:text-brass-dark transition-colors">
                    Read article <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            ) : null}

            {rest.length > 0 ? (
              <div className="mt-12 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <Link
                    key={post.id}
                    to="/journal/$slug"
                    params={{ slug: post.slug }}
                    className="reveal group flex flex-col justify-between overflow-hidden rounded-2xl border border-brass/50 bg-white/70 p-5 sm:p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-brass hover:shadow-lg"
                  >
                    <div>
                      <div className="overflow-hidden rounded-xl border border-brass/30 bg-paper-2">
                        <img
                          src={post.cover_thumb || post.cover_image}
                          alt={post.title}
                          width={600}
                          height={375}
                          loading="lazy"
                          className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                      </div>
                      <time className="mt-4 block text-xs text-muted">{formatDate(post.publish_date)}</time>
                      <h3 className="mt-2 font-display text-lg sm:text-xl font-medium leading-snug text-ink transition-colors group-hover:text-brass">
                        {post.title}
                      </h3>
                      {post.excerpt ? (
                        <p className="mt-2 line-clamp-2 text-xs sm:text-sm leading-relaxed text-muted">
                          {post.excerpt}
                        </p>
                      ) : null}
                    </div>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-brass group-hover:text-brass-dark transition-colors">
                      Read article <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </Link>
                ))}
              </div>
            ) : null}
          </section>
        )}
      </main>
      <FooterSettingsContext.Provider value={settings}>
        <Footer />
      </FooterSettingsContext.Provider>
    </div>
  );
}
