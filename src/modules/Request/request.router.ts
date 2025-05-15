import { Router } from "express";
import { IRequestController, CreateRequestSchema } from ".";
import { validate } from "@middleware";

export interface IRequestRouter {
    readonly router: Router;
}

export class RequestRouter implements IRequestRouter {
    public readonly router: Router
    constructor(
        private requestController: IRequestController,
    ) {
        this.router = Router();
        this.routers();
    }

    private routers() {
        this.router.post("/new-request", 
            validate("body", CreateRequestSchema),
            this.requestController.createRequest.bind(this.requestController));
    }
}