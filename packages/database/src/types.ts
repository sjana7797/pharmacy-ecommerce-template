import { InferSelectModel } from "drizzle-orm";
import { categories, products } from "./schema";

// types
export type Product = InferSelectModel<typeof products>;

export type Category = InferSelectModel<typeof categories>;
