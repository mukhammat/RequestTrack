ALTER TABLE "Request" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "Request" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "Request" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "Request" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "Request" DROP COLUMN "update_at";