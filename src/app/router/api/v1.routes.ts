import { Router } from "express";
import { authRoute, todoRoute, userRoute } from "@modules";

export const v1 = Router();

// ::::::::::::::: REGISTER ALL MODULE HANDLERS ::::::::::::::: //

v1.use('/auth', authRoute); // Auth

v1.use('/todo', todoRoute); // Todo

v1.use('/user', userRoute); // User

// ::::::::::::::: //REGISTER ALL MODULE HANDLERS ::::::::::::::: //
