ALTER TABLE "customers" ADD COLUMN "last_login" timestamp (3) with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "is_verified" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "reset_password_token" varchar(255);--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "reset_password_expires_at" timestamp (3) with time zone;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "verification_token" varchar(255);--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "verification_expires_at" timestamp (3) with time zone;