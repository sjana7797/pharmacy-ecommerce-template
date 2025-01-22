import { createTRPCRouter, publicProcedure } from "@/api/trpc";
import { getPaginatedItemsSchema } from "@repo/common/schema";
import RedisClient from "ioredis";
import { categories } from "@repo/db/schema";
import { categoryParent } from "@repo/db";
import { eq } from "drizzle-orm";
import { generatePaginatedResponse } from "@/api/utils/response";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const categoriesRouter = createTRPCRouter({
  getAllCategories: publicProcedure
    .input(getPaginatedItemsSchema)
    .query(async ({ ctx, input }) => {
      const { db } = ctx;

      const { cursor, limit } = input;

      console.log({ cursor, limit });

      const page = cursor ?? 1;

      const take = limit + 1;
      const skip = (page - 1) * limit;

      const client = new RedisClient({});

      const cachedData = await client.get(`categories:${page}:${limit}`);

      if (cachedData) {
        return JSON.parse(cachedData);
      }

      let categoriesData = await db
        .select()
        .from(categories)
        .leftJoin(categoryParent, eq(categories.id, categoryParent.parentId))
        .limit(take)
        .offset(skip);

      console.log({ categoriesData });

      // check if categories is empty
      if (!categoriesData?.length) {
        return generatePaginatedResponse([], null, page);
      }

      // check if there is more products
      let nextCursor: number | null = null;

      if (categoriesData.length > limit) {
        nextCursor = page + 1;
      }

      categoriesData = categoriesData.slice(0, limit);

      console.log({ categoriesData });

      const response = generatePaginatedResponse(
        categoriesData,
        nextCursor,
        page,
      );
      console.log({ response });
      void client.set(
        `categories:${page}:${limit}`,
        JSON.stringify(response),
        "EX",
        60,
      );

      return response;
    }),

  getCategory: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const { db } = ctx;

      const categoryData = await db
        .select()
        .from(categories)
        .where(eq(categories.id, input))
        .limit(1);

      if (!categoryData.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Category not found",
        });
      }

      return categoryData[0];
    }),
});
