import { Express, Response } from 'express'

declare global {
  namespace Express {
    interface Response {
      toJson: (
        // this: Response,
        data: any,
        error?: any,
        statusCode?: number,
        message?: string,
      ) => void;
    }
  }
}
