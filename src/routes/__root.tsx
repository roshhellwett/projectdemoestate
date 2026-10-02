import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import appCss from "../styles/app.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#faf7f2" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      { name: "format-detection", content: "telephone=no" },
      { property: "og:site_name", content: "SS Property Kolkata" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/images/og-banner.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "SS Property Kolkata - Verified Luxury Residences & Commercial Spaces" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/images/og-banner.jpg" },
    ],
    links: [
      { rel: "icon", href: "/images/ss-logo-ink.webp", type: "image/webp" },
      { rel: "apple-touch-icon", href: "/images/ss-logo-ink.webp" },
      { rel: "stylesheet", href: appCss },
      /* Preload critical fonts for faster render */
      {
        rel: "preload",
        href: appCss,
        as: "style",
      },
    ],
  }),
  component: RootDocument,
  errorComponent: RootErrorComponent,
});

function RootErrorComponent() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-paper text-ink flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full rounded-3xl border border-brass/40 bg-white p-8 shadow-2xl shadow-brass/15">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brass-ghost text-brass text-xl font-bold">
            SS
          </div>
          <h1 className="mt-4 font-display text-2xl font-semibold text-ink">SS Property Kolkata</h1>
          <p className="mt-1 text-xs uppercase tracking-widest text-brass">Verified Luxury Real Estate</p>
          <div className="my-6 h-px bg-line/80" />
          <h2 className="font-display text-lg font-medium text-ink">Temporary Connection Refresh</h2>
          <p className="mt-2 text-sm text-muted leading-relaxed">
            Our luxury advisory and physical property tours are fully active. Reach out directly to our principal advisor.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <a
              href="https://wa.me/919429693786"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper hover:bg-ink-2 transition-all shadow-md"
            >
              <span>WhatsApp Advisor (+91 94296 93786)</span>
            </a>
            <a
              href="/"
              className="rounded-full border border-brass/40 bg-white px-6 py-2.5 text-xs font-semibold text-ink hover:border-brass transition-all"
            >
              Return to Homepage
            </a>
          </div>
        </div>
        <Scripts />
      </body>
    </html>
  );
}

function RootDocument() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
