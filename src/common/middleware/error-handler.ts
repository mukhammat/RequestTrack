import { ErrorRequestHandler } from 'express';
import { HttpException } from '../exceptions';
// import { Prisma } from "@prisma/client";

export const errorHanler: ErrorRequestHandler = (error, _req, res, _next) => {
  console.log(error);
  let status = 500;
  let errorMessage = 'Internal server error';

  if (error instanceof HttpException) {
    status = error.status;
    errorMessage = error.message;
  }

  res.status(status).json({
    message: errorMessage,
  });
};
