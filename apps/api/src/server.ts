import app from "./app";
import { serve } from "@hono/node-server";
import { env } from "./env";

serve({
  fetch: app.fetch,
  port: env.PORT,
});
