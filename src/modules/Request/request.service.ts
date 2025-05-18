import { DrizzleClient, request, TransactionType } from '@db';
import { and, between, eq, gte, lte, ne } from 'drizzle-orm';
import {
  CreateRequestDto,
  StatusEnum,
  UpdateStatusDto,
  NEW,
  WORKING,
  COMPLETED,
  CANCELED,
  ChangeRequestStatusDto,
  GetRequestType,
  GetAllRequestDto,
  Options,
} from '.';
import { BadRequestException, NotFoundException } from '@exceptions';

export interface IRequestService {
  createRequest(data: CreateRequestDto): Promise<string>;
  changeRequestStatus(data: ChangeRequestStatusDto): Promise<string>;
  cancelAllOnWorking(): Promise<string[]>;
  getAllRequest(options: any): Promise<GetRequestType[]>;
}

export class RequestService implements IRequestService {
  constructor(private db: DrizzleClient) {}

  /**
   * Public create request methos
   *
   * @param data
   * @returns Promise<id>
   */
  public async createRequest(data: CreateRequestDto) {
    console.log('createRequest data', data);
    const [req] = await this.db.insert(request).values(data).returning({ id: request.id });

    return req.id;
  }

  /**
   * Private update request status method
   *
   * @param data
   * @returns Promice<id>
   */
  private async updateStatus({ tx, status, requestId, result }: UpdateStatusDto) {
    const [req] = await tx
      .update(request)
      .set({
        status,
        result,
      })
      .where(and(eq(request.id, requestId), ne(request.status, status)))
      .returning({ id: request.id });

    if (!req) {
      throw new NotFoundException();
    }

    return req.id;
  }

  /**
   * Private get request by id method
   *
   * @param id
   * @param tx
   * @returns GetRequestDto
   */
  private async getById(id: string, tx: TransactionType) {
    const result = await tx.query.request.findFirst({
      where: eq(request.id, id),
    });

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  /**
   *
   * @param requestId
   * @param result
   * @param status
   * @returns Promise<id>
   */
  public async changeRequestStatus({ requestId, status, result }: ChangeRequestStatusDto) {
    return this.db.transaction(async (tx) => {
      const req = await this.getById(requestId, tx);
      let updateStatus: StatusEnum;

      switch (status) {
        case COMPLETED:
          updateStatus = COMPLETED;
          if (req.status !== WORKING) {
            throw new BadRequestException();
          }
          break;
        case CANCELED:
          updateStatus = CANCELED;
          if ([CANCELED, COMPLETED].includes(req.status)) {
            throw new BadRequestException();
          }
          break;
        case WORKING:
          updateStatus = WORKING;
          if (req.status !== NEW) {
            throw new BadRequestException();
          }
          break;
        default:
          throw new BadRequestException();
      }

      return this.updateStatus({ requestId, status: updateStatus, tx, result });
    });
  }

  /**
   *
   * @returns Promice<requestId[]>
   */
  public async cancelAllOnWorking() {
    const result = await this.db
      .update(request)
      .set({ status: CANCELED })
      .where(eq(request.status, WORKING))
      .returning({ id: request.id });
    if (!result.length) {
      throw new NotFoundException();
    }

    return result.map((r) => r.id);
  }

  public async getAllRequest({ date, from, to }: GetAllRequestDto) {
    const conditions: any[] = [];

    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      conditions.push(and(gte(request.created_at, start), lte(request.created_at, end)));
    }

    if (from && to) {
      const dateFrom = new Date(from);
      const dateTo = new Date(to);
      conditions.push(between(request.created_at, dateFrom, dateTo));
    } else {
      if (from) {
        conditions.push(gte(request.created_at, new Date(from)));
      }

      if (to) {
        conditions.push(lte(request.created_at, new Date(to)));
      }
    }

    const options: Options = {};
    if (conditions.length > 0) {
      options.where = and(...conditions);
    }

    return this.db.query.request.findMany(options);
  }
}
