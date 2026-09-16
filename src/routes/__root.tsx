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
});

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
