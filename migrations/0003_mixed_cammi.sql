CREATE TYPE "public"."request_status_enum" AS ENUM('new', 'working', 'completed', 'canceled');--> statement-breakpoint
CREATE TABLE "request" (
	"id" uuid PRIMARY KEY NOT NULL,
	"subject" varchar(256),
	"text" text,
	"status" "request_status_enum" DEFAULT 'new' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
DROP TABLE "Request" CASCADE;--> statement-breakpoint
DROP TYPE "public"."RequestStatusEnum";