import { IRequestService } from ".";
import { Request, Response } from "express";
import { httpResponse } from "@utils";

export interface IRequestController {
    createRequest(req: Request, res: Response): Promise<void>
}

export class RequestController {
    constructor(private requestService: IRequestService) {
    }

    public async createRequest(req: Request, res: Response) {
        const { subject, text } = req.body;
        console.log("Subject", subject, "/n", "Text", text);
        const id = await this.requestService.createRequest({subject, text});
        console.log("Id", id);
        res.status(200).send({data: {id}, message: "Request is created!"})
    }
}