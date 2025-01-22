import healthRoute from "./health";
import categoriesRoute from "./categories";
import { Hono } from "hono";
import { clerkMiddleware } from "@hono/clerk-auth";
import brandsRoute from "./brands";

const rootRoute = new Hono();

// protected routes
rootRoute.use("/", clerkMiddleware({}));

/**
 * All routes
 */
// health route
rootRoute.route("/health", healthRoute);
rootRoute.route("/categories", categoriesRoute);
rootRoute.route("/brands", brandsRoute);

export default rootRoute;
