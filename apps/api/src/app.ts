import rootRoute from "./routes";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { poweredBy } from "hono/powered-by";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";

const app = new Hono();

// middlewares
app.use(logger());
app.use(poweredBy());
app.use(cors());

/**
 * All routes
 */
app.route("/", rootRoute);

// api routes v1 for public
app.route("/api/v1", rootRoute);

// Webhook routes
app.get("/webhook", (c) => {
  return c.text("ok");
});

// Error handling
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    // Get the custom response
    return c.json(err.getResponse(), err.status);
  } else {
    return c.json(
      {
        error: true,
        message: err.message,
      },
      500,
    );
  }
});

export default app;
