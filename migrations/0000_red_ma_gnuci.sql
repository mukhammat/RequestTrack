CREATE TYPE "public"."Status" AS ENUM('new', 'working', 'completed', 'canceled');--> statement-breakpoint
CREATE TABLE "Request" (
	"id" uuid PRIMARY KEY NOT NULL,
	"subject" varchar(256),
	"text" text,
	"status" "Status" DEFAULT 'new',
	"created_at" timestamp DEFAULT now(),
	"update_at" timestamp
);
