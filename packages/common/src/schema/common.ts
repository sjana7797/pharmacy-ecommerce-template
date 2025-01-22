import { z } from "zod";

export const statusSchema = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);

export const getPaginatedItemsSchema = z.object({
  limit: z.number().min(1).max(50).default(10),
  cursor: z.number().nullish().default(1),
});

export type PaginationRequest = z.infer<typeof getPaginatedItemsSchema>;
