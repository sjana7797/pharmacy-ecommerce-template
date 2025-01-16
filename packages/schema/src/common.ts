import { z } from "zod";

export const statusSchema = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);
