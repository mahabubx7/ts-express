import { Router } from "express";
import { v2TodoHandler } from "@modules";

export const v2 = Router();

v2.use('/todo', v2TodoHandler);
