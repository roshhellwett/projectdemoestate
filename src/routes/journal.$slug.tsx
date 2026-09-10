import { createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { initRevealOnScroll } from "../lib/reveal";
import { getSupabaseForRoute } from "../lib/route-supabase";
import { getBlogPostBySlug } from "../lib/queries";
import { formatDate } from "../lib/format";

export const Route = createFileRoute("/journal/$slug")({
  loader: async ({ params }) => {
    const post = await getBlogPostBySlug(getSupabaseForRoute(), params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    return {
      
      meta: post
        ? [
            { name: "description", content: post.excerpt || post.content.slice(0, 150) },
            { property: "og:image", content: post.cover_image },
          ]
        : [],
    };
  },
  component: JournalPostPage,
});

function JournalPostPage() {
  const { post } = Route.useLoaderData();
  const paragraphs = post.content.split(/\n\s*\n/).filter(Boolean);

  useEffect(() => {
    initRevealOnScroll();
  }, []);

  return (
    <div className="min-h-dvh">
      <Header />
      <main className="pt-16">
        <article className="shell max-w-[720px] py-14">
          <time className="text-xs text-muted">
            {formatDate(post.publish_date)} · {post.author}
          </time>
          <h1 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight text-ink md:text-[2.75rem]">
            {post.title}
          </h1>

          {post.cover_image ? (
            <img
              src={post.cover_image}
              alt={post.title}
              width={1200}
              height={750}
              className="mt-8 aspect-[16/10] w-full rounded-[var(--radius-img)] object-cover"
            />
          ) : null}

          <div className="mt-10 space-y-6">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-[16px] leading-[1.8] text-ink/80">
                {p}
              </p>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
