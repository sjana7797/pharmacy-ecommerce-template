import { z } from "zod";
import { ALPHANUMERIC_WITH_SPECIAL_CHARACTERS } from "@repo/common";

export const signInSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(8).regex(ALPHANUMERIC_WITH_SPECIAL_CHARACTERS),
});
