import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  beforeLoad: ({}) => {
    if (!context.session) {
      throw redirect({
        to: "/auth/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});
