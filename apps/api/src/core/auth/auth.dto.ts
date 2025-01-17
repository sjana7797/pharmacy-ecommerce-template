import {
  registerCustomerSchema,
  signInSchema,
  registerUserSchema,
} from "@repo/schema";
import { createZodDto } from "nestjs-zod";

export class SignInDto extends createZodDto(signInSchema) {}
export class CustomerRegisterDto extends createZodDto(registerCustomerSchema) {}
export class UserRegisterDto extends createZodDto(registerUserSchema) {}
