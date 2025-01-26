import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { Session } from "@/admin/types/providers/auth";
import NotFound from "@/admin/components/not-found";

export const Route = createRootRouteWithContext<{
  session: Session | null;
}>()({
  component: Outlet,
  notFoundComponent: NotFound,
});
