import { createFileRoute, redirect } from "@tanstack/react-router";
import { PropertyEditor } from "../components/admin/property-editor";
import { getSupabaseBrowser } from "../lib/supabase";

export const Route = createFileRoute("/admin/property/$id")({
  head: () => ({
    meta: [{ title: "Edit Listing · Admin" }, { name: "robots", content: "noindex" }],
  }),
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    const supabase = getSupabaseBrowser();
    const { data } = await supabase.auth.getSession();
    if (!data.session) throw redirect({ to: "/login" });
  },
  component: PropertyEditorRoute,
});

function PropertyEditorRoute() {
  const { id } = Route.useParams();
  return <PropertyEditor propertyId={id} />;
}
