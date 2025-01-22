import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { alias } from "drizzle-orm/pg-core";
import { categories } from "./schema";

export const db = drizzle(process.env.DATABASE_URL!);

export const categoryParent = alias(categories, "category_parent");
