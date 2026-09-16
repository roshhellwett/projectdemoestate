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

export const Route = createFileRoute("/journal")({
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
      { title: "Journal · SS Property" },
      { name: "description", content: "Kolkata market notes, buyer guides and honest advice from SS Property." },
      { property: "og:title", content: "The Journal · SS Property Kolkata" },
      { property: "og:description", content: "Kolkata market notes, buyer guides and honest advice from SS Property." },
      { property: "og:image", content: "/images/og-banner.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "The Journal · SS Property Kolkata" },
      { name: "twitter:image", content: "/images/og-banner.jpg" },
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
    <div className="min-h-dvh">
      <Header />
      <FloatingConcierge />
      <main className="pt-14 lg:pt-16">
        <section className="border-b border-line bg-paper-2/60">
          <div className="shell py-14 md:py-20">
            <p className="eyebrow">Notes from the ground</p>
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
                className="reveal group grid gap-8 border-b border-line pb-12 md:grid-cols-2"
              >
                <div className="overflow-hidden rounded-[var(--radius-img)] border border-line">
                  <img
                    src={lead.cover_thumb || lead.cover_image}
                    alt={lead.title}
                    width={800}
                    height={500}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <time className="text-xs text-muted">{formatDate(lead.publish_date)}</time>
                  <h2 className="mt-3 font-display text-2xl font-medium leading-snug text-ink md:text-3xl">
                    {lead.title}
                  </h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
                    {lead.excerpt || lead.content.slice(0, 200)}
                  </p>
                  <span className="mt-4 text-sm font-semibold text-brass">Read article →</span>
                </div>
              </Link>
            ) : null}

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <Link
                  key={post.id}
                  to="/journal/$slug"
                  params={{ slug: post.slug }}
                  className="reveal group block"
                >
                  <div className="overflow-hidden rounded-[var(--radius-img)] border border-line">
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
                  <h3 className="mt-2 font-display text-lg font-medium leading-snug text-ink">
                    {post.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <FooterSettingsContext.Provider value={settings}>
        <Footer />
      </FooterSettingsContext.Provider>
    </div>
  );
}
