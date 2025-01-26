import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";
import NotFound from "../components/not-found";
import { DefaultCatchBoundary } from "../components/global/default-catch-boundary";

export const router = createTanStackRouter({
  routeTree,
  defaultPreload: "intent",
  defaultErrorComponent: DefaultCatchBoundary,
  defaultNotFoundComponent: () => <NotFound />,
  context: {
    session: null,
  },
});
