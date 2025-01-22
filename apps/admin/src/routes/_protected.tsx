import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  beforeLoad: ({ context }) => {
    // if (!context.session) {
    //   throw redirect({
    //     to: "/auth/login",
    //     search: {
    //       redirect: location.href,
    //     },
    //   });
    // }
  },
});
