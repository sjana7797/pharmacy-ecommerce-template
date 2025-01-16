DROP TABLE "products_to_categories" CASCADE;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "category_ids" uuid[] DEFAULT '{}' NOT NULL;
