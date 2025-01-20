import { createFileRoute } from "@tanstack/react-router";
import Login from "@/admin/pages/auth/login";
import { login } from "@/admin/api/functions/auth";

export const Route = createFileRoute("/_protected")({
  beforeLoad: ({ context }) => {
    console.log("beforeLoad", context.user);
    if (!context.user) {
      console.log("Not authenticated");
      throw new Error("Not authenticated");
    }
  },
  errorComponent: ({ error }) => {
    if (error.message === "Not authenticated") {
      return <Login />;
    }

    throw error;
  },
});
