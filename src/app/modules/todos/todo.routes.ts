import { Router } from "express";
import { AuthGuard, DtoGuard, PermissionGuard } from "@guards";
import { createTodo, getAllTodo, getTodo, getTodos, removeTodo, updateTodo } from "./v1.controller";
import { getAllTodo_2 } from "./v2.controller";
import { todoDataPolicy } from "./todo.policy";
import { createTodoDto } from "./dto";
import { TodoModel } from "./todo.model";


export const todoRoute = Router(); // v1
export const v2TodoRoute = Router(); // v2

// :: --- V1 --- :: // -----------------------------

todoRoute.post('/', [
  DtoGuard(createTodoDto),
  AuthGuard('accessJwt'),
  PermissionGuard({
    action: 'create',
    resource: todoDataPolicy.resource,
    policy: todoDataPolicy,
  }),
], createTodo);

todoRoute.put('/:id', [
  AuthGuard('accessJwt'),
  PermissionGuard({
    action: ['update', 'update:own'], // user|update:own && admins|update
    resource: todoDataPolicy.resource,
    policy: todoDataPolicy,
    options: {
      owner: {
        type: 'resource',
        field: 'author',
        entity: TodoModel,
      }
    },
  }),
], updateTodo);

todoRoute.delete('/:id', [
  AuthGuard('accessJwt'),
  PermissionGuard({
    action: ['delete:own', 'delete'], // user|delete:own && admins|delete
    resource: todoDataPolicy.resource,
    policy: todoDataPolicy,
    options: {
      owner: {
        type: 'resource',
        field: 'author',
        entity: TodoModel,
      }
    },
  }),
], removeTodo);

todoRoute.get('/all', [
  AuthGuard('accessJwt'),
  PermissionGuard({
    action: 'read:any',
    resource: todoDataPolicy.resource,
    policy: todoDataPolicy,
  }),
], getAllTodo); // for admins only

todoRoute.get('/:id', [
  AuthGuard('accessJwt'),
  PermissionGuard({
    action: ['read', 'read:own'], // user|read:own && admins|read
    resource: todoDataPolicy.resource,
    policy: todoDataPolicy,
    options: {
      owner: {
        type: 'resource',
        field: 'author',
        entity: TodoModel,
      }
    },
  }),
], getTodo);

todoRoute.get('/', [
  AuthGuard('accessJwt'),
  PermissionGuard({
    action: 'read:list',
    resource: todoDataPolicy.resource,
    policy: todoDataPolicy,
    options: {
      owner: {
        type: 'resource',
        field: 'author',
        entity: TodoModel,
      }
    },
  }),
], getTodos); // return user's own todo list



// :: --- V2 --- :: // -----------------------------
v2TodoRoute.get('/', [
  AuthGuard('accessJwt'),
  PermissionGuard({
    action: 'read:any',
    resource: todoDataPolicy.resource,
    policy: todoDataPolicy,
  }),
], getAllTodo_2); // v2
