CREATE TYPE "public"."status_enum" AS ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED');--> statement-breakpoint
ALTER TABLE "brands" ADD COLUMN "status" "status_enum" DEFAULT 'DRAFT';--> statement-breakpoint
ALTER TABLE "brands" ADD COLUMN "is_deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "is_deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "status" "status_enum" DEFAULT 'DRAFT';--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "status" "status_enum" DEFAULT 'DRAFT';--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "is_deleted" boolean DEFAULT false;