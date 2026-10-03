import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoginForm } from "../components/login-form";
import { getSupabaseBrowser } from "../lib/supabase";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Sign In · Agency Portal Demo" }, { name: "robots", content: "noindex" }],
  }),
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    const supabase = getSupabaseBrowser();
    const { data } = await supabase.auth.getSession();
    if (data.session) throw redirect({ to: "/admin" });
  },
  component: () => <LoginForm />,
});
