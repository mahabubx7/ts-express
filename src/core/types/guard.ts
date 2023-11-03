import { NextFunction, Request, Response } from "express";

export type Guard = (req: Request, res: Response, next: NextFunction) => void;
