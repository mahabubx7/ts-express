import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export const globalErrorHandlerPipe = (
  err: any,
  __: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    res.toJson(false, err, 406, err.message);
  } else {
    res.toJson(null, err, err.code ?? 500, err.message ?? 'Something went wrong!');
  }

  next(err);
};


// exports
export * from './custom.exception';
export * from './dto.exception';
