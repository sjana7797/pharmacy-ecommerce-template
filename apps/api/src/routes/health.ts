import { Hono } from "hono";

const healthRoute = new Hono();

healthRoute.get("/", () => {
  return new Response("OK");
});

export default healthRoute;
