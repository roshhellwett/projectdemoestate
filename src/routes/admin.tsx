import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getSupabaseBrowser } from "../lib/supabase";

/**
 * /admin layout route: auth guard + shared chrome. Child routes
 * (admin.index.tsx dashboard, admin.new.tsx, admin.property.$id.tsx)
 * render through <Outlet />.
 *
 * The guard runs in the browser only: the session lives in localStorage,
 * which does not exist during SSR. RLS still protects every query, so an
 * unauthenticated visitor sees an empty dashboard at worst.
 */
export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin Dashboard · Agency Portal Demo" }, { name: "robots", content: "noindex" }],
  }),
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    const supabase = getSupabaseBrowser();
    const { data } = await supabase.auth.getSession();
    if (!data.session) throw redirect({ to: "/login" });
  },
  component: () => <Outlet />,
});
