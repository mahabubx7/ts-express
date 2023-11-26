import { Router } from "express";
import { AuthGuard, DtoGuard, PermissionGuard } from "@guards";
import { createTodo, getAllTodo, getTodo, getTodos, removeTodo, updateTodo } from "./v1.controller";
import { getAllTodo_2 } from "./v2.controller";
import { todoDataPolicy } from "./todo.policy";
import { createTodoDto, queryWithId, updateTodoDto } from "./dto";
import { TodoModel } from "./todo.model";
import { RequestThrottler } from "src/core";


export const todoRoute = Router(); // v1
export const v2TodoRoute = Router(); // v2

// :: --- V1 --- :: // -----------------------------

// CREATE
todoRoute.post('/', [
  DtoGuard(createTodoDto),
  AuthGuard('accessJwt'),
  PermissionGuard({
    action: 'create',
    resource: todoDataPolicy.resource,
    policy: todoDataPolicy,
  }),
], createTodo);

// UPDATE
todoRoute.put('/:id', [
  DtoGuard(updateTodoDto),
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

// DELETE
todoRoute.delete('/:id', [
  DtoGuard(queryWithId),
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

// READ :: ALL
todoRoute.get('/all', [
  AuthGuard('accessJwt'),
  PermissionGuard({
    action: 'read:any',
    resource: todoDataPolicy.resource,
    policy: todoDataPolicy,
  }),
], getAllTodo); // for admins only

// READ :: ONE
todoRoute.get('/:id', [
  DtoGuard(queryWithId),
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

// READ :: OWN:LIST
todoRoute.get('/', [
  RequestThrottler(5), // test limit 5 hits / 30 sec
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
