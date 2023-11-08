import { Router } from "express";
import { verifyEmail } from "./v1.controller";
import { DtoGuard } from "src/app/guards";
import { verifyEmailDto } from "./dto/email.dto";

export const verifyRoute = Router();

verifyRoute.get('/email', [DtoGuard(verifyEmailDto)], verifyEmail);
