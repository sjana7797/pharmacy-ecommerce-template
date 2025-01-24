import { createMiddleware } from "hono/factory";
import { getCookie } from "hono/cookie";
import { verify } from "jsonwebtoken";
import { env } from "../env";

export const verifyToken = createMiddleware<{
  Variables: {
    userId: string;
  };
}>(async (c, next) => {
  const token = getCookie(c, "token");

  if (!token) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  try {
    const decode = verify(token, env.JWT_SECRET);

    if (!decode) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    c.set("userId", decode?.id as string);

    await next();
  } catch (error) {}
});
