import { createFileRoute, Outlet } from "@tanstack/react-router";

/**
 * /journal layout route: renders child routes (/journal/ index and /journal/$slug)
 * through <Outlet />.
 */
export const Route = createFileRoute("/journal")({
  component: () => <Outlet />,
});
