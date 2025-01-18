import { createLazyFileRoute } from "@tanstack/react-router";
import HomePage from "@/admin/pages/home";

export const Route = createLazyFileRoute("/")({
  component: HomePage,
});
