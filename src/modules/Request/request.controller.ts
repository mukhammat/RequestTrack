import { CANCELED, COMPLETED, IRequestService, WORKING } from ".";
import { Request, Response } from "express";

export interface IRequestController {
    createRequest(req: Request, res: Response): Promise<void>
    cancelAllOnWorking(_req: Request, res: Response): Promise<void>
    takeRequest(req: Request, res: Response): Promise<void>
    completeRequest(req: Request, res: Response): Promise<void>
    cancelRequest(req: Request, res: Response): Promise<void>
}

export class RequestController {
    constructor(private requestService: IRequestService) {
    }

    public async createRequest(_req: Request, res: Response) {
        const { subject, text } = res.locals.validatedData;
        console.log("Subject", subject, "/n", "Text", text);
        const id = await this.requestService.createRequest({subject, text});
        console.log("Id", id);
        res.status(201).send({data: {id}, message: "Request is created!"});
    }

    public async cancelAllOnWorking(_req: Request, res: Response) {
        const result = await this.requestService.cancelAllOnWorking();
        res.status(200).send({data: {result}, message: null});
    }

    public async takeRequest(req: Request, res: Response) {
        const {requestId} = req.body;
        await this.requestService.changeRequestStatus({requestId, status: WORKING});
        res.status(200).send({data: null, message: "Request on wroking"});
    }

    public async completeRequest(req: Request, res: Response) {
        const {requestId, result} = req.body;
        await this.requestService.changeRequestStatus({requestId, status: COMPLETED, result});
        res.status(200).send({data: null, message: "Request on completed"});
    }

    public async cancelRequest(req: Request, res: Response) {
        const {requestId, result} = req.body;
        await this.requestService.changeRequestStatus({requestId, status: CANCELED, result});
        res.status(200).send({data: null, message: "Request is canceled"});
    }
}