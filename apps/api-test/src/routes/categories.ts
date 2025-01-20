import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { getPaginatedItemsSchema } from "@repo/schema";
import { db, categoryParent } from "@repo/db";
import { schema } from "@repo/db";
import { eq } from "drizzle-orm";

const categoriesRoute = new Hono();

categoriesRoute.get(
  "/",
  zValidator("query", getPaginatedItemsSchema),
  async (c) => {
    const { limit, page } = c.req.valid("query");

    const take = limit + 1;
    const skip = (page - 1) * limit;

    // query categories
    let categories = await db
      .select()
      .from(schema.categories)
      .leftJoin(
        categoryParent,
        eq(categoryParent.id, schema.categories.parentId),
      )
      .limit(take)
      .offset(skip);

    // check if categories is empty
    if (!categories?.length) {
      return c.notFound();
    }

    // check if there is more products
    let nextCursor: number | null = null;

    if (categories.length > limit) {
      nextCursor = page + 1;
    }

    categories = categories.slice(0, limit);

    return c.json({
      data: categories,
      nextCursor,
      page,
      total: categories.length,
    });
  },
);

export default categoriesRoute;
