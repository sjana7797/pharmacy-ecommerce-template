import { Hono } from "hono";
import healthRoute from "./health";
import categoriesRoute from "./categories";

const rootRoute = new Hono();

/**
 * All routes
 */
// health route
rootRoute.route("/health", healthRoute);
rootRoute.route("/category", categoriesRoute);

export default rootRoute;
