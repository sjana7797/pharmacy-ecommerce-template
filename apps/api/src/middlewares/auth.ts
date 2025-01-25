import { createMiddleware } from "hono/factory";
import { getCookie } from "hono/cookie";
import { verify } from "jsonwebtoken";
import { env } from "../env";
import { db } from "@repo/db";
import { roles, users } from "@repo/db/schema";
import { eq } from "drizzle-orm";

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
  } catch (error) {
    console.log(error);
    return c.json({ message: "Unauthorized" }, 401);
  }
});

export const checkUserPermission = (
  type: "read" | "write" | "delete" | "update",
) =>
  createMiddleware<{
    Variables: {
      userId: string;
    };
  }>(async (c, next) => {
    const userId = c.var.userId;

    if (!userId) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    try {
      const userRow = await db
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .leftJoin(roles, eq(users.role, roles.role))
        .execute();

      if (!userRow.length) {
        return c.json({ message: "Invalid user" }, 401);
      }

      const user = userRow[0].users;
      const role = userRow[0].roles;

      if (!role || !user) {
        return c.json({ message: "Invalid user" }, 401);
      }

      if (!role[type]) {
        return c.json({ message: "Unauthorized" }, 401);
      }

      await next();
    } catch (error) {
      console.error("Error while verifying user", error);

      return c.json({ message: "Internal server error" }, 500);
    }
  });
