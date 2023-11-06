import { Router } from "express";
import { getAllTodo } from "./v1.controller";
import { getAllTodo_2 } from "./v2.controller";

export const todoRoute = Router(); // v1
export const v2TodoRoute = Router(); // v2

todoRoute.get('/', getAllTodo); // v1

v2TodoRoute.get('/', getAllTodo_2); // v2
