import { Router } from "express";
import { v2TodoRoute } from "@modules";

export const v2 = Router();

v2.use('/todo', v2TodoRoute);
