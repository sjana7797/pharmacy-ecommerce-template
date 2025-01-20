import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import NotFound from "../pages/not-found";
import { Session } from "../types/providers/auth";

export const Route = createRootRouteWithContext<{
  session: Session | null;
}>()({
  component: Outlet,
  notFoundComponent: NotFound,
});
