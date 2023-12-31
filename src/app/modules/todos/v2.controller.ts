import { Controller } from "@core";
import { todoQuery } from "./todo.query";

export const getAllTodo_2: Controller = async (_, res) => {
  const todos = await todoQuery.getTodos();
  res.status(200).json({
    data: todos,
    apiVersion: 'v2'
  })
};
