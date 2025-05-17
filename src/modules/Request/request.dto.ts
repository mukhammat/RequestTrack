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

export type GetRequestType = {
    id: string
    subject: string
    text: string
    status: StatusEnum
    result: string | null
    created_at: Date | null
    updated_at: Date | null
};

export type CreateRequestDto = Omit<GetRequestType, "id" | "status" | "updated_at" | "created_at" | "result">;

export type UpdateRequestDto = Partial<GetRequestType>;

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

export type GetAllRequestDto = {
    date?: string
    from?: string
    to?: string
}

export type Options = {
    where?: any
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

export const StatusZodEnum = z.enum([
    NEW,
    WORKING,
    COMPLETED,
    CANCELED
])

export const ChangeRequestStatusSchema = z.object({
    requestId: z.string().uuid("not uuid type"),
    status: StatusZodEnum
});

export const ResultSchema = z.object({
    result: z.string().optional()
});

export const UuidSchecma = z.string().uuid("not uuid type");