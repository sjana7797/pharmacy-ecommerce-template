import { Hono } from "hono";
import { db, categoryParent } from "@repo/db";
import { categories } from "@repo/db/schema";
import { eq } from "drizzle-orm";
import RedisClient from "ioredis";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import {
  createCategorySchema,
  updateCategorySchema,
} from "@repo/common/schema";
import { removeUndefined } from "@repo/common/utils";
import { HTTPException } from "hono/http-exception";

const pathParamsIdSchema = z.object({
  id: z.string().uuid(),
});

const categoriesRoute = new Hono();

categoriesRoute
  .get("/", async (c) => {
    const client = new RedisClient({});

    const s = c.req.query();

    const page = s.page ? Number(s.page) : 1;
    const limit = s.limit ? Number(s.limit) : 10;

    const take = limit + 1;
    const skip = (page - 1) * limit;

    const cachedData = await client.get(`categories:${page}:${limit}`);

    if (cachedData) {
      return c.json(JSON.parse(cachedData));
    }

    // query categories
    let categoriesData = await db
      .select()
      .from(categories)
      .leftJoin(categoryParent, eq(categories.id, categoryParent.parentId))
      .limit(take)
      .offset(skip);

    // check if categories is empty
    if (!categoriesData?.length) {
      return c.notFound();
    }

    // check if there is more products
    let nextCursor: number | null = null;

    if (categoriesData.length > limit) {
      nextCursor = page + 1;
      categoriesData = categoriesData.slice(0, limit);
    }

    client.set(
      `categories:${page}:${limit}`,
      JSON.stringify({
        data: categoriesData,
        nextCursor,
        page,
        total: categoriesData.length,
      }),
      "EX",
      60,
    );

    return c.json({
      data: categoriesData,
      nextCursor,
      page,
      total: categoriesData.length,
    });
  })
  .post("/", zValidator("json", createCategorySchema), async (c) => {
    const body = c.req.valid("json");
    const parsedBody = removeUndefined(body);

    const category = await db.insert(categories).values(parsedBody).returning();

    if (!category.length) {
      throw new HTTPException(500, {
        message: "Failed to create category",
      });
    }

    return c.json(category[0]);
  });

categoriesRoute
  .get("/:id", zValidator("param", pathParamsIdSchema), async (c) => {
    const { id } = c.req.valid("param");

    const category = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id))
      .execute();

    if (!category.length) {
      return c.notFound();
    }

    return c.json(category[0]);
  })
  .delete(zValidator("param", pathParamsIdSchema), async (c) => {
    const { id } = c.req.valid("param");

    const categoriesData = await db
      .update(categories)
      .set({
        isDeleted: true,
      })
      .where(eq(categories.id, id))
      .returning();

    if (!categoriesData.length) {
      return c.notFound();
    }

    return c.json(categoriesData);
  })
  .patch(
    zValidator("param", pathParamsIdSchema),
    zValidator("json", createCategorySchema.partial()),
    async (c) => {
      const { id } = c.req.valid("param");

      const body = c.req.valid("json");

      const parsedBody = removeUndefined(body);

      const updatedCategory = await db
        .update(categories)
        .set(parsedBody)
        .where(eq(categories.id, id))
        .returning();

      if (!updatedCategory.length) {
        return c.notFound();
      }

      return c.json(updatedCategory);
    },
  );

categoriesRoute.get(
  "/slug/:slug",
  zValidator("param", z.object({ slug: z.string() })),
  async (c) => {
    const { slug } = c.req.valid("param");

    const category = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, slug))
      .execute();

    if (!category.length) {
      return c.notFound();
    }

    return c.json(category[0]);
  },
);

export default categoriesRoute;
