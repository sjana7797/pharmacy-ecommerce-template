ALTER TABLE "brands" ADD COLUMN "created_at" timestamp (3) with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "brands" ADD COLUMN "updated_at" timestamp (3) with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "created_at" timestamp (3) with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "updated_at" timestamp (3) with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "created_at" timestamp (3) with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "updated_at" timestamp (3) with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "created_at" timestamp (3) with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "updated_at" timestamp (3) with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "created_at" timestamp (3) with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updated_at" timestamp (3) with time zone DEFAULT now();