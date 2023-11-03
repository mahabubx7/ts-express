import { Router } from "express";
import { getAllTodo } from "./v1.controller";
import { getAllTodo_2 } from "./v2.controller";

export const v1TodoHandler = Router();
export const v2TodoHandler = Router();

v1TodoHandler.get('/', getAllTodo);
v2TodoHandler.get('/', getAllTodo_2);
