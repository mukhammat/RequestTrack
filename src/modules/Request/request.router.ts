import { Router } from "express";
import { IRequestController, CreateRequestSchema } from ".";
import { validate, asyncWrapper } from "@middleware";

interface IRequestRouter {
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

    private bindAsyncHandler(str: keyof IRequestController) {
        return asyncWrapper(this.requestController[str].bind(this.requestController));
    }

    private routers() {
        this.router
        .post("/requests", 
            validate("body", CreateRequestSchema),
            this.bindAsyncHandler("createRequest"))
        .patch("/cancel-all", 
            this.bindAsyncHandler("cancelAllOnWorking"))
        .patch("/take-request", this.bindAsyncHandler("takeRequest"))
        .patch("/cancel", this.bindAsyncHandler("cancelRequest"))
        .patch("/complete", this.bindAsyncHandler("completeRequest"))
    }
}