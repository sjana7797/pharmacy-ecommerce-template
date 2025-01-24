import { Hono } from "hono";
import { db } from "@repo/db";
import { brands } from "@repo/db/schema";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { createBrandSchema } from "@repo/common/schema";
import { removeUndefined } from "@repo/common/utils";
import { generatePaginatedResponse } from "../utils/response";
import { HTTPException } from "hono/http-exception";

const pathParamsIdSchema = z.object({
  id: z.string().uuid(),
});

const brandsRoute = new Hono();

brandsRoute
  .get("/", async (c) => {
    const s = c.req.query();

    const page = s.page ? Number(s.page) : 1;
    const limit = s.limit ? Number(s.limit) : 10;

    const take = limit + 1;
    const skip = (page - 1) * limit;

    // query brands
    let brandsData = await db.select().from(brands).limit(take).offset(skip);

    // check if brands is empty
    if (!brandsData?.length) {
      return c.notFound();
    }

    // check if there is more products
    let nextCursor: number | null = null;

    if (brandsData.length > limit) {
      nextCursor = page + 1;
      brandsData = brandsData.slice(0, limit);
    }

    const response = generatePaginatedResponse(brandsData, nextCursor, page);

    return c.json(response);
  })
  .post("/", zValidator("json", createBrandSchema), async (c) => {
    const body = c.req.valid("json");
    const parsedBody = removeUndefined(body);

    const brand = await db.insert(brands).values(parsedBody).returning();

    if (!brand.length) {
      throw new HTTPException(500, {
        message: "Failed to create brand",
      });
    }

    return c.json(brand[0]);
  });

brandsRoute
  .get("/:id", zValidator("param", pathParamsIdSchema), async (c) => {
    const { id } = c.req.valid("param");

    const brand = await db
      .select()
      .from(brands)
      .where(eq(brands.id, id))
      .execute();

    if (!brand.length) {
      return c.notFound();
    }

    return c.json(brand[0]);
  })
  .delete(zValidator("param", pathParamsIdSchema), async (c) => {
    const { id } = c.req.valid("param");

    const brandsData = await db
      .update(brands)
      .set({
        isDeleted: true,
      })
      .where(eq(brands.id, id))
      .returning();

    if (!brandsData.length) {
      return c.notFound();
    }

    return c.json(brandsData);
  })
  .patch(
    zValidator("param", pathParamsIdSchema),
    zValidator("json", createBrandSchema.partial()),
    async (c) => {
      const { id } = c.req.valid("param");

      const body = c.req.valid("json");

      const parsedBody = removeUndefined(body);

      const updatedBrand = await db
        .update(brands)
        .set(parsedBody)
        .where(eq(brands.id, id))
        .returning();

      if (!updatedBrand.length) {
        return c.notFound();
      }

      return c.json(updatedBrand);
    },
  );

brandsRoute.get(
  "/slug/:slug",
  zValidator("param", z.object({ slug: z.string() })),
  async (c) => {
    const { slug } = c.req.valid("param");

    const category = await db
      .select()
      .from(brands)
      .where(eq(brands.slug, slug))
      .execute();

    if (!category.length) {
      return c.notFound();
    }

    return c.json(category[0]);
  },
);

export default brandsRoute;
