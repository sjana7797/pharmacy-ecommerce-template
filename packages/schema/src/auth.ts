import { z } from "zod";
import {
  ALPHANUMERIC_WITH_SPECIAL_CHARACTERS,
  PHONE_NUMBER,
} from "@repo/common";

export const signInSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(8).regex(ALPHANUMERIC_WITH_SPECIAL_CHARACTERS),
});

export type SignIn = z.infer<typeof signInSchema>;

const baseUserRegistrationSchema = z.object({
  email: z.string().email().min(1),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .regex(ALPHANUMERIC_WITH_SPECIAL_CHARACTERS, {
      message: "Password must be alphanumeric with special characters",
    }),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

export const registerCustomerSchema = baseUserRegistrationSchema.extend({
  phone: z.string().length(10).regex(PHONE_NUMBER).optional(),
  age: z
    .number()
    .min(18, {
      message: "Age must be at least 18",
    })
    .max(100, {
      message: "Age must be less than 100",
    }),
});

export const registerUserSchema = registerCustomerSchema.extend({
  role: z.enum(["MEMBER", "ADMIN"]).default("MEMBER"),
});
