import { pgEnum, pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { randomUUID } from "crypto"

export const RequestStatusEnum = pgEnum("request_status_enum", [
    "new",
    "working",
    "completed",
    "canceled"
]);

export const request = table("request", {
    id: t.uuid().primaryKey().notNull().defaultRandom(),
    subject: t.varchar("subject", { length: 256 }).notNull(),
    text: t.text("text").notNull(),
    status: RequestStatusEnum().notNull().default('new'),
    result: t.text("result"),
    created_at: t.timestamp('created_at').defaultNow(),
    updated_at: t.timestamp('updated_at')
});