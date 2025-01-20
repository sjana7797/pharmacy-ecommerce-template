import Login from "@/admin/pages/auth/login";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/auth/login")({
  component: Login,
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
});
