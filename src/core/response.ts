import { NextFunction, Response, Request } from 'express'

interface ToJSON {
  data?: any;
  error?: any;
  message?: string;
  statusCode?: number;
}

function toJson<T = any>(
  this: Response,
  data: T,
  error?: any,
  statusCode?: number | undefined,
  message?: string | undefined,
) {
  let modifiedJson: ToJSON = {};
  if (message) modifiedJson.message = message;
  modifiedJson.statusCode = statusCode ?? 200;
  modifiedJson.data = data ? data : null;
  modifiedJson.error = error ? error : null;


  this.status(statusCode ?? 200).json(modifiedJson);
};
export function applyToJSON(_: Request, res: Response, next: NextFunction) {
  res.toJson = toJson;
  next();
}
