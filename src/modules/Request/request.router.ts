import { Router } from "express";
import { IRequestController } from ".";

export interface IRequestRouter {
    readonly router: Router;
}

export class RequestRouter implements IRequestRouter {
    public readonly router: Router
    constructor(
        private requestController: IRequestController,
    ) {
        this.router = Router()//.all("/request");
        this.routers();
    }

    private routers() {
        this.router.post("/new-request", 
            this.requestController.createRequest.bind(this.requestController));
        
    }
}