import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { brands, categories, customers, products, users } from "./schema";

// types
// store types
export type Product = InferSelectModel<typeof products>;
export type Category = InferSelectModel<typeof categories>;
export type Brand = InferSelectModel<typeof brands>;

// users types
export type Customer = InferSelectModel<typeof customers>;
export type CustomerCreatePayload = InferInsertModel<typeof customers>;
export type User = InferSelectModel<typeof users>;
export type UserCreatePayload = InferInsertModel<typeof users>;
