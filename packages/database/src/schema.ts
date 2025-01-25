import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  varchar,
  uuid,
  pgEnum,
  decimal,
  timestamp,
  boolean,
  AnyPgColumn,
  json,
} from "drizzle-orm/pg-core";

export const ROLE_ENUM = pgEnum("users_enum", [
  "ADMIN",
  "USER",
  "PHARMACIST",
  "PRODUCT_MANAGER",
  "ACCOUNT_MANAGER",
  "CUSTOMER",
]);

export const STATUS_ENUM = pgEnum("status_enum", [
  "DRAFT",
  "PUBLISHED",
  "ARCHIVED",
]);

export const roles = pgTable("roles", {
  role: ROLE_ENUM("role").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),

  status: STATUS_ENUM("status").default("DRAFT"),

  isDeleted: boolean("is_deleted").default(false),

  permissions: json("permissions").$type<{
    users: {
      read: boolean;
      write: boolean;
      delete: boolean;
      update: boolean;
    };
    roles: {
      read: boolean;
      write: boolean;
      delete: boolean;
      update: boolean;
    };
  }>(),

  createdAt: timestamp("created_at", {
    precision: 3,
    withTimezone: true,
  }).defaultNow(),
  updatedAt: timestamp("updated_at", {
    precision: 3,
    withTimezone: true,
  }),
});

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),

  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),

  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password").notNull(),

  role: ROLE_ENUM("role")
    .default("USER")
    .notNull()
    .references((): AnyPgColumn => roles.role),

  lastLogin: timestamp("last_login", {
    precision: 3,
    withTimezone: true,
  }).defaultNow(),

  isVerified: boolean("is_verified").default(false),

  resetPasswordToken: varchar("reset_password_token", { length: 255 }),
  resetPasswordExpiresAt: timestamp("reset_password_expires_at", {
    precision: 3,
    withTimezone: true,
  }),

  verificationToken: varchar("verification_token", { length: 255 }),
  verificationExpiresAt: timestamp("verification_expires_at", {
    precision: 3,
    withTimezone: true,
  }),

  refreshToken: varchar("refresh_token", { length: 255 }),
  refreshExpiresAt: timestamp("refresh_expires_at", {
    precision: 3,
    withTimezone: true,
  }),

  createdAt: timestamp("created_at", {
    precision: 3,
    withTimezone: true,
  }).defaultNow(),
  updatedAt: timestamp("updated_at", {
    precision: 3,
    withTimezone: true,
  }).defaultNow(),
});

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  sku: integer("sku").notNull().unique(),

  status: STATUS_ENUM("status").default("DRAFT"),
  isDeleted: boolean("is_deleted").default(false),

  costPrice: decimal("cost_price").notNull(),
  sellingPrice: decimal("selling_price").notNull(),
  discountPrice: decimal("discount_price").notNull(),

  brandId: uuid("brand_id").notNull(),

  categoryIds: uuid("category_ids").array().default([]).notNull(),

  sales: integer("sales").default(0).notNull(),

  createdAt: timestamp("created_at", {
    precision: 3,
    withTimezone: true,
  }).defaultNow(),
  updatedAt: timestamp("updated_at", {
    precision: 3,
    withTimezone: true,
  }).defaultNow(),
});

export const brands = pgTable("brands", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),

  status: STATUS_ENUM("status").default("DRAFT"),
  isDeleted: boolean("is_deleted").default(false),

  createdAt: timestamp("created_at", {
    precision: 3,
    withTimezone: true,
  }).defaultNow(),
  updatedAt: timestamp("updated_at", {
    precision: 3,
    withTimezone: true,
  }).defaultNow(),
});

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),

  isDeleted: boolean("is_deleted").default(false),

  status: STATUS_ENUM("status").default("DRAFT"),
  parentId: uuid("parent_id").references((): AnyPgColumn => categories.id),

  createdAt: timestamp("created_at", {
    precision: 3,
    withTimezone: true,
  }).defaultNow(),
  updatedAt: timestamp("updated_at", {
    precision: 3,
    withTimezone: true,
  }).defaultNow(),
});

// relations
export const productsRelations = relations(products, ({ one }) => ({
  brand: one(brands, {
    fields: [products.brandId],
    references: [brands.id],
  }),

  categories: one(categories, {
    fields: [products.categoryIds],
    references: [categories.id],
  }),
}));

export const brandsRelations = relations(brands, ({ many }) => ({
  posts: many(products),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(users),
}));
