import { Router, Request, Response } from "express";
import { v1 } from "./v1.routes";
import { v2 } from "./v2.routes";
import { Token } from "@core";

export const api = Router();


api.use('/v1', v1); // API version :: v1
api.use('/v2', v2); // API version :: v2

api.get('/', (req: Request, res: Response) => {

  res.status(200).json({
    message: 'Welcome!',
    reqInfo: {
      httpVersion: req.httpVersion,
      userAgent: req.headers["user-agent"],
      ip: [req.ip, req.ips],
      url: req.protocol + '://' + req.get('host'),
      key: new Token().genToken()
    },
  });
});


api.use('*', (_: Request, res: Response) => {
  res.status(404).json({
    message: 'API route-error 404!'
  });
});
