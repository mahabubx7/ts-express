import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { logger } from "../logger";

export const globalErrorHandlerPipe = (
  err: any,
  __: Request,
  res: Response,
  next: NextFunction
) => {
  const errCode = err.code ?? 500;

  if (err instanceof ZodError) {
    res.toJson(false, err, 406, err.message);
  } else {
    res.toJson(null, err, errCode, err.message ?? 'Something went wrong!');
  }

  if ([500, 501, 502].includes(errCode)) {
    logger.error('Internal Error: ', err);
  }
  next(err);
};


// exports
export * from './custom.exception';
export * from './dto.exception';
export * from './notfound.exception';
export * from './unauthorized.exception';
export * from './forbidden.exception';
