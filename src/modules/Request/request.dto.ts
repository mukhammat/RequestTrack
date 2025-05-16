export const 
    NEW = "new",
    WORKING = "working",
    COMPLETED = "completed",
    CANCELED = "canceled";

const Status = {
    NEW,
    WORKING,
    COMPLETED,
    CANCELED
} as const;

export type StatusEnum = typeof Status[keyof typeof Status];

export type GetRequestDto = {
    id: string,
    subject: string,
    text: string,
    status: StatusEnum,
    result: string,
    created_at: string | null;
    updated_at: Date | null;
};

export type CreateRequestDto = Omit<GetRequestDto, "id" | "status" | "updated_at" | "created_at" | "result">;

export type UpdateRequestDto = Partial<GetRequestDto>;

import { TransactionType } from "@db";

export type UpdateStatusDto = {
    requestId: string,
    status: StatusEnum,
    tx: TransactionType,
    result?: string
}

export type ChangeRequestStatusDto = {
    requestId: string,
    status: StatusEnum,
    result?: string,
}

import {z} from "zod"

export const CreateRequestSchema = z.object({
    subject: z.string()
        .min(5, "less than 5 chars")
        .max(30, "more than 30 chars"),
    text: z.string()
        .min(15, "less than 15 chars")
        .max(255, "more than 255 chars"),
});
