import {
  CANCELED,
  ChangeRequestStatusDto,
  COMPLETED,
  IRequestService,
} from '.';
import { Request, Response } from 'express';

export interface IRequestController {
  createRequest(req: Request, res: Response): Promise<void>;
  cancelAllOnWorking(_req: Request, res: Response): Promise<void>;
  getAllRequest(req: Request, res: Response): Promise<void>;
  changeRequestStatus(req: Request, res: Response): Promise<void>;
}

export class RequestController implements IRequestController {
  constructor(private requestService: IRequestService) {}

  public async createRequest(_req: Request, res: Response) {
    const { subject, text } = res.locals.validatedData;
    const id = await this.requestService.createRequest({ subject, text });
    res.status(201).send({ data: { id }, message: 'Request is created!' });
  }

  public async cancelAllOnWorking(_req: Request, res: Response) {
    const result = await this.requestService.cancelAllOnWorking();
    res.status(200).send({ data: { result }, message: null });
  }

  public async getAllRequest(req: Request, res: Response) {
    const { date, from, to } = req.query;
    const result = await this.requestService.getAllRequest({ date, from, to });
    res.status(200).send({ data: { result }, message: null });
  }

  public async changeRequestStatus(req: Request, res: Response) {
    const { requestId, status } = res.locals.validatedData;
    const { result } = req.body;

    const data: ChangeRequestStatusDto = {
      requestId,
      status,
    };

    if ([COMPLETED, CANCELED].includes(status)) {
      data.result = result;
    }

    await this.requestService.changeRequestStatus(data);
    res.status(200).send({ data: null, message: `Request status is ${status}` });
  }
}
