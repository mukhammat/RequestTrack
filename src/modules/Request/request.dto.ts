export type StatusEnum = "new" | "working" | "completed" | "canceled";

export type GetRequestDto = {
    id: string,
    subject: string,
    text: string,
    status: StatusEnum,
    created_at: string | null;
    updated_at: Date | null;
};

export type CreateRequestDto = Omit<GetRequestDto, "id" | "status" | "updated_at" | "created_at">;

export type UpdateRequestDto = Partial<GetRequestDto>;

import {z} from "zod"

export const CreateRequestSchema = z.object({
    subject: z.string()
        .min(5, "less than 5 chars")
        .max(30, "more than 30 chars"),
    text: z.string()
        .min(15, "less than 15 chars")
        .max(255, "more than 255 chars"),
});
