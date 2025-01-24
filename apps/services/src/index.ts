import { Hono } from "hono";
import { logger } from "hono/logger";
import { rootRoute } from "./routes";

const app = new Hono();

// middleware
app.use(logger());

app.route("/", rootRoute);

export default {
  fetch: app.fetch,
  port: 5001,
};
