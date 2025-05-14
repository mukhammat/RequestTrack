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
