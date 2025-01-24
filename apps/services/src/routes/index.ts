import { Hono } from "hono";
import { emailRoute } from "./email";

export const rootRoute = new Hono();

rootRoute.route("/email", emailRoute);
