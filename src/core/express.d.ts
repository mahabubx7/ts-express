import { Express, Response } from "express";
import { TokenDataType, UserAuthData, RequestState } from '@core'

declare global {
  namespace Express {
    interface Response {
      toJson<T = any> (
        data: T | Partial<T>,
        error?: any,
        statusCode?: number,
        message?: string
      ): void;
    }

    interface User extends TokenDataType {}
    interface State extends RequestState {}

    interface Request {
      user: User
      parsed: {[x: string]: any}
      state: State
    }
  }
}
