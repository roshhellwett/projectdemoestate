import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { FloatingConcierge } from "../components/floating-concierge";
import { House, MagnifyingGlass, Sparkle } from "@phosphor-icons/react";

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [{ title: "Page Not Found · SS Property Kolkata" }],
  }),
  component: NotFoundPage,
});

function NotFoundPage() {
  return (
    <div className="min-h-dvh bg-paper text-ink flex flex-col justify-between">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-20 pt-28 sm:pt-36">
        <div className="w-full max-w-md text-center rounded-3xl border border-brass/40 bg-white/90 p-8 sm:p-10 shadow-xl shadow-brass/5">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-brass/30 bg-brass-ghost px-3.5 py-1 text-xs font-semibold text-brass-dark mb-4">
            <Sparkle size={13} weight="fill" className="text-brass" />
            <span>404 - Not Found</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl font-medium tracking-tight text-ink">
            404
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-muted">
            This address is currently unavailable. Our prime residential and commercial listings are actively verified and waiting for you.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-xs font-bold uppercase tracking-wider text-paper shadow-md transition-all hover:bg-ink-2"
            >
              <House size={15} />
              <span>Back to Home</span>
            </Link>

            <Link
              to="/properties"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-brass/40 bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-ink hover:border-brass transition-all"
            >
              <MagnifyingGlass size={15} />
              <span>Explore Listings</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingConcierge />
    </div>
  );
}
