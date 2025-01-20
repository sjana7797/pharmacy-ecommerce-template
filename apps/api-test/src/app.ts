import { Hono } from "hono";
import { logger } from "hono/logger";
import rootRoute from "./routes";

const app = new Hono();

// middlewares
app.use(logger());

// route set
app.route("/", rootRoute);

export default app;
