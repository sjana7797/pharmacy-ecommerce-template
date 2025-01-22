import { z } from "zod";
import { statusSchema } from "./common";

export const createBrandSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long",
  }),

  description: z.string().min(2, {
    message: "Description must be at least 2 characters long",
  }),

  slug: z
    .string()
    .min(2, { message: "Slug must be at least 2 characters long" }),

  status: statusSchema.default("DRAFT"),
  isDeleted: z.boolean().default(false),
});
