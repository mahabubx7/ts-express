import { Express, Response } from "express";
import { UserAuthData } from '@core'

declare global {
  namespace Express {
    interface Response {
      toJson: (
        data: any,
        error?: any,
        statusCode?: number,
        message?: string
      ) => void;
    }

    interface User extends UserAuthData {}
    interface Request {
      user: UserAuthData
    }
  }
}
