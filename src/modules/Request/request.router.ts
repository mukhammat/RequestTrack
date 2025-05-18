import { Router } from 'express';
import {
  IRequestController,
  CreateRequestSchema,
  ChangeRequestStatusSchema,
  ResultSchema,
} from '.';
import { validate, asyncWrapper } from '@middleware';

interface IRequestRouter {
  readonly router: Router;
}

export class RequestRouter implements IRequestRouter {
  public readonly router: Router;
  constructor(private requestController: IRequestController) {
    this.router = Router();
    this.routers();
  }

  private bindAsyncHandler(str: keyof IRequestController) {
    return asyncWrapper(this.requestController[str].bind(this.requestController));
  }

  private routers() {
    this.router
      .post(
        '/requests',
        validate('body', CreateRequestSchema),
        this.bindAsyncHandler('createRequest'),
      )
      .patch('/cancel-all', this.bindAsyncHandler('cancelAllOnWorking'))
      .patch(
        '/requests/:requestId/status/:status',
        validate('body', ResultSchema),
        validate('params', ChangeRequestStatusSchema),
        this.bindAsyncHandler('changeRequestStatus'),
      )
      .get('/requests', this.bindAsyncHandler('getAllRequest'));
  }
}
