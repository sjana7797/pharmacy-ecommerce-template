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

export const registerUserSchema = z.object({
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
  role: z
    .enum([
      "ADMIN",
      "USER",
      "PHARMACIST",
      "PRODUCT_MANAGER",
      "ACCOUNT_MANAGER",
      "CUSTOMER",
    ])
    .default("CUSTOMER"),
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

export const verifyEmailSchema = z.object({
  userId: z.string().uuid(),
  verificationToken: z.string(),
});
