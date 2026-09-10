import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  component: NotFoundPage,
});

function NotFoundPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-7xl font-medium text-ink">404</p>
      <p className="mt-4 max-w-sm text-sm text-muted">
        This page has moved out of the building. The listings, however, are very much in place.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition-transform hover:-translate-y-0.5"
      >
        Back to Home
      </Link>
    </div>
  );
}
