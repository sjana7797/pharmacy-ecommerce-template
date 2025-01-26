import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { alias } from "drizzle-orm/pg-core";
import * as schema from "./schema";
import postgres from "postgres";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const conn = globalForDb.conn ?? postgres(process.env.DATABASE_URL!);
if (process.env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, {
  schema,
});

export const categoryParent = alias(schema.categories, "category_parent");
