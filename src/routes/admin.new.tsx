import { createFileRoute, redirect } from "@tanstack/react-router";
import { PropertyCreator } from "../components/admin/property-editor";
import { getSupabaseBrowser } from "../lib/supabase";

export const Route = createFileRoute("/admin/new")({
  head: () => ({
    meta: [{ title: "New Listing · Admin" }, { name: "robots", content: "noindex" }],
  }),
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    const supabase = getSupabaseBrowser();
    const { data } = await supabase.auth.getSession();
    if (!data.session) throw redirect({ to: "/login" });
  },
  component: () => <PropertyCreator />,
});
