import { Router } from "express";
import { v1TodoHandler, v1UserHandler } from "@modules";

export const v1 = Router();

// ::::::::::::::: REGISTER ALL MODULE HANDLERS ::::::::::::::: //

v1.use('/todo', v1TodoHandler); // Todo

v1.use('/user', v1UserHandler); // User

// ::::::::::::::: //REGISTER ALL MODULE HANDLERS ::::::::::::::: //
