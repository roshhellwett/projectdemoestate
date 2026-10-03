import { createFileRoute } from "@tanstack/react-router";
import { AdminDashboard } from "../components/admin/dashboard";

/**
 * /admin index: listings table + enquiries inbox. Guarded by the /admin
 * layout route (admin.tsx).
 */
export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [{ title: "Admin Dashboard · Agency Portal Demo" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminDashboard,
});
