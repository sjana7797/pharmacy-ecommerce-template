import { AuthLayout } from "@/admin/layouts/auth-layout";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/_layout")({
  component: () => (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  ),
});
