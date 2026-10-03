import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { FooterSettingsContext } from "../components/footer-settings";
import { FloatingConcierge } from "../components/floating-concierge";
import { initRevealOnScroll } from "../lib/reveal";
import { getSupabaseForRoute } from "../lib/route-supabase";
import { getBlogPostBySlug, getSiteSettings } from "../lib/queries";
import { formatDate } from "../lib/format";

export const Route = createFileRoute("/journal/$slug")({
  loader: async ({ params }) => {
    const supabase = getSupabaseForRoute();
    const [post, settings] = await Promise.all([
      getBlogPostBySlug(supabase, params.slug),
      getSiteSettings(supabase),
    ]);
    if (!post) throw notFound();
    return { post, settings };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    const desc = post?.excerpt || post?.content?.slice(0, 150) || "Apex Living Journal article.";
    const img = post?.cover_image || "/images/properties/luxury_penthouse_terrace_1790945979055.jpg";
    return {
      meta: post
        ? [
            { title: `${post.title} · Apex Living` },
            { name: "description", content: desc },
            { property: "og:title", content: `${post.title} · Apex Living` },
            { property: "og:description", content: desc },
            { property: "og:image", content: img },
            { property: "og:type", content: "article" },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:title", content: `${post.title} · Apex Living` },
            { name: "twitter:description", content: desc },
            { name: "twitter:image", content: img },
          ]
        : [],
    };
  },
  component: JournalPostPage,
});

function JournalPostPage() {
  const { post, settings } = Route.useLoaderData();
  const paragraphs = post.content.split(/\n\s*\n/).filter(Boolean);

  useEffect(() => {
    initRevealOnScroll();
  }, []);

  return (
    <div className="min-h-dvh bg-paper">
      <Header />
      <FloatingConcierge />
      <main className="pt-20 sm:pt-24 lg:pt-28">
        <article className="shell max-w-[760px] py-10 sm:py-14">
          <nav className="mb-6 flex items-center gap-2 text-xs font-semibold text-brass">
            <Link
              to="/journal"
              className="inline-flex items-center gap-1.5 hover:text-ink transition-colors"
            >
              <span>←</span>
              <span>Back to Journal</span>
            </Link>
          </nav>

          <time className="text-xs font-medium text-muted">
            {formatDate(post.publish_date)} · {post.author}
          </time>
          <h1 className="mt-3 font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl md:text-[2.75rem]">
            {post.title}
          </h1>

          {post.cover_image ? (
            <div className="mt-8 overflow-hidden rounded-2xl border border-brass/50 bg-paper-2 shadow-xs">
              <img
                src={post.cover_image}
                alt={post.title}
                width={1200}
                height={750}
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          ) : null}

          <div className="mt-10 space-y-6">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-[16px] leading-[1.85] text-ink/85">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-14 border-t border-line pt-8 flex items-center justify-between">
            <Link
              to="/journal"
              className="inline-flex items-center gap-2 rounded-full border border-brass/50 bg-white px-5 py-2.5 text-xs font-semibold text-ink shadow-xs hover:border-brass hover:text-brass-dark transition-all"
            >
              <span>← All Articles</span>
            </Link>
          </div>
        </article>
      </main>
      <FooterSettingsContext.Provider value={settings}>
        <Footer />
      </FooterSettingsContext.Provider>
    </div>
  );
}
