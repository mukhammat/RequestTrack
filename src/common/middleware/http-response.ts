import {Request, Response, NextFunction} from "express"

type SuccessResponseType = {
    success: true;
    message: string;
    data: unknown;
};

type ErrorResponseType = {
    success: false;
    message: string;
    code?: string | null;
};

type ResponseDto = {
    data?: unknown;
    message?: string,
    status?: number
}

module.exports = (req: Request, res: Response, next: NextFunction) => {
  res.locals.seccess = function ({ success = true, code = 200, data, message = 'ok' }) {
    this.json({
      success,
      code,
      message,
      data
    })
  }

  res.locals.error = function ({ success = false, code = 400, error, message = 'error' }) {
    this.json({
      success,
      code,
      message,
      error
    })
  }

  next()
}