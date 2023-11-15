import { NextFunction, Request, Response } from "express"
import { TokenDataType } from "./token"

export interface RequestState {
  accessToken?: string
  refreshToken?: string
  jwtPayload?: TokenDataType
  ua?: string
  ip?: string | undefined
  internal?: {
    response: {
      filter: string []
    }
  }
}

export const applyRequestState = (req: Request, _: Response, __: NextFunction) => {
  req.state = {
    internal: {
      response: {
        filter: [],
      }
    }
  }; // init empty state

  __(); // proceed to next
}
