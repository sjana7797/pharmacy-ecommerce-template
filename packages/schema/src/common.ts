import { z } from "zod";

export const statusSchema = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);

export const getPaginatedItemsSchema = z.object({
  limit: z.number().min(1).max(50).default(10),
  page: z.number().min(1).default(1),
});

export type PaginationRequest = z.infer<typeof getPaginatedItemsSchema>;
