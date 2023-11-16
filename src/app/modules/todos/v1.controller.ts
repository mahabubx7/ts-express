import { Controller, ForbiddenException } from "@core";
import { todoQuery } from "./todo.query";
import { TodoModel } from "./todo.model";

// only for admins :: dummy controller for rbac/pbac checks
// GET :: READ
export const getAllTodo: Controller = async (_, res) => {
  const todos = await todoQuery.getTodos();
  res.toJson({ ...todos, apiVersion: 'v1' }, null);
};

// GET :: READ
export const getTodos: Controller = async (req, res) => {
  const { user } = req;
  if (!user || !user.sub) {
    throw new ForbiddenException('Auth metadata corrupted!');
  }
  const todos = await todoQuery.getTodoList(user.sub);
  res.toJson(todos);
};

// GET :: READ
export const getTodo: Controller = async (req, res) => {
  const { id } = req.params;
  const todo = await todoQuery.getTodo(id);
  res.toJson(todo);
};

// POST :: CREATE
export const createTodo: Controller = async (req, res) => {
  const { body, user } = req;
  const todo = await todoQuery.createTodo(new TodoModel({ ...body, author: user?.sub }));
  res.toJson({ message: 'Todo added successfully!', todo }, null, 201);
};

// PUT :: UPDATE
export const updateTodo: Controller = async (req, res) => {
  const { body, params } = req;
  const { id } = params;
  const todo = await todoQuery.updateTodo(id, body);
  res.toJson({ message: 'Todo updated successfully!', todo }, null, 202);
};

// DELETE
export const removeTodo: Controller = async (req, res) => {
  const { id } = req.params;
  const todo = await todoQuery.deleteTodo(id);
  res.toJson({ message: 'Todo deleted successfully!', todo }, null, 202);
};
