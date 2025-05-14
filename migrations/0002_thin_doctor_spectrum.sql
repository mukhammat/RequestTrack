CREATE TYPE "public"."RequestStatusEnum" AS ENUM('new', 'working', 'completed', 'canceled');--> statement-breakpoint
ALTER TABLE "Request" ALTER COLUMN "status" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "Request" ALTER COLUMN "status" SET DATA TYPE "public"."RequestStatusEnum" USING "status"::text::"public"."RequestStatusEnum";--> statement-breakpoint
ALTER TABLE "Request" ALTER COLUMN "status" SET DEFAULT 'new';--> statement-breakpoint
DROP TYPE "public"."Status";