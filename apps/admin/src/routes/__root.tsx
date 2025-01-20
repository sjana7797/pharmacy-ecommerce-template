import { createRootRoute, Outlet } from "@tanstack/react-router";
import NotFound from "../pages/not-found";
import App from "../App";

export const Route = createRootRoute({
  component: () => (
    <App>
      <Outlet />
    </App>
  ),
  notFoundComponent: NotFound,
});
