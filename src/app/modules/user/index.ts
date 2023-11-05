import { Router } from "express";
import { addUser, getUser, getUsers, removeUser, updateUser } from "./v1.controller";
import { DtoGuard } from "@guards";
import { createUserDto, queryWithId, updateUserDto } from "./dto";

export const v1UserHandler = Router();

// POST :: CREATE
v1UserHandler.post(
  '/',
  [DtoGuard(createUserDto)],
  addUser
);

// PUT :: UPDATE
v1UserHandler.put(
  '/:id',
  [DtoGuard(updateUserDto)],
  updateUser
);

// DELETE :: REMOVE
v1UserHandler.delete('/', removeUser);

// GET (ALL) :: READ
v1UserHandler.get('/', getUsers);

// GET (ONE) :: READ
v1UserHandler.get('/:id', [DtoGuard(queryWithId)], getUser);

// exports
export * from  './user.model';
export * from  './user.query';
export * from './user.role'
