import { DrizzleClient, request } from "@db";
import { CreateRequestDto, GetRequestDto, StatusEnum, UpdateRequestDto } from ".";
import { eq, ne } from "drizzle-orm";


export interface IRequestService {
    createRequest(data: CreateRequestDto): Promise<string>
    updateStatus(requestId: string, status: StatusEnum): Promise<string>
    getRequestById(id: string): Promise<GetRequestDto>
    cancelAllOnWorking(): Promise<string[]>
}

const 
    WORKING = "working",
    CANCELED = "canceled";

export class RequestService implements IRequestService {
    constructor(private db: DrizzleClient) {
    }

    public async createRequest(data: CreateRequestDto) {
        console.log("createRequest data", data);
        const [result] = await this.db.insert(request)
            .values(data)
            .returning({ id: request.id });

        return result.id
    }

    public async updateStatus(requestId: string, status: StatusEnum) {
        const [result] = await this.db.update(request).set({
            status
        }).where(eq(request.id, requestId) && ne(request.status, status))
        .returning({id: request.id});
        
        return result.id;
    }

    public async getRequestById(id: string) {
        const result = await this.db
            .query.request
            .findFirst({
                where: eq(request.id, id)
            });

        if(!result) {
            throw Error("Not found!");
        }

        return result;
    }

    public async cancelAllOnWorking() {
        const result = await this.db
            .update(request)
            .set({ status: CANCELED })
            .where(eq(request.status, WORKING))
            .returning({ id: request.id });
        //this.hasData(result);
        if(!result.length) {
            throw Error("")
        }

        return result.map(r => r.id);
    }

    private hasData(arr: any) {
        if(!arr.length) {
            throw Error()
        }
    }
}