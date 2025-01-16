import { z } from "zod";
import { statusSchema } from "./common";

export const createProductSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters long",
  }),
  slug: z
    .string()
    .min(2, { message: "Slug must be at least 2 characters long" }),
  sku: z.number(),
  costPrice: z.number(),
  sellingPrice: z.number(),
  discountPrice: z.number().optional(),
  brandId: z.string(),
  categoryIds: z.array(z.string()),
  status: statusSchema.default("DRAFT"),
  isDeleted: z.boolean().default(false),
});
