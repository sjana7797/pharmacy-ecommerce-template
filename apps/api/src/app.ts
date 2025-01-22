import { trpcServer } from "@hono/trpc-server";
import rootRoute from "./routes";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { appRouter } from "./trpc/router";
import { poweredBy } from "hono/powered-by";
import { createClient } from "redis";
import { rateLimiter } from "hono-rate-limiter";
import { RedisStore } from "rate-limit-redis";
import RedisClient from "ioredis";
import { cors } from "hono/cors";
import { createContext } from "./trpc";
import { HTTPException } from "hono/http-exception";

const app = new Hono();

// middlewares
app.use(logger());
app.use(poweredBy());
app.use(cors());

// Create a `node-redis` client

// const s = async () => {
//   // Then connect to the Redis server
//   await client.connect();

//   // Create and use the rate limiter
//   const limiter = rateLimiter({
//     // Rate limiter configuration
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
//     standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//     keyGenerator: (c) => c.req.header("cf-connecting-ip") ?? "", // Disable the `X-RateLimit-*` headers

//     // Redis store configuration
//     store: new RedisStore({
//       sendCommand: (...args: string[]) => client.sendCommand(args),
//     }),
//   });

//   client.set("rate-limit:test", "test");
//   app.use(limiter);
// };

// void s();

/**
 * All routes
 */
app.route("/", rootRoute);

// trpc routes
// app.use(
//   "/trpc/*",
//   trpcServer({
//     router: appRouter,
//     createContext: createContext,
//   }),
// );

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
    return err.getResponse();
  } else {
    return c.json({
      error: true,
      message: err.message,
    });
  }
});

export default app;
