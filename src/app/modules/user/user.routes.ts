import { Router } from "express";
import { DtoGuard } from "@guards";
import { addUser, getUser, getUsers, removeUser, updateUser } from "./v1.controller";
import { createUserDto, queryWithId, updateUserDto } from "./dto";

export const userRoute = Router(); // by default: v1

// POST / :: CREATE A USER
userRoute.post('/',
  [
    DtoGuard(createUserDto)
  ],
  addUser
);

// PUT / :: UPDATE A USER
userRoute.put('/',
  [
    DtoGuard(updateUserDto)
  ],
  updateUser
);

// DELETE / :: REMOVE A USER
userRoute.delete('/:id',
  [
    DtoGuard(queryWithId),
  ],
  removeUser
);

// GET /:id :: GET ONE USERS
userRoute.get('/:id',
  [
    DtoGuard(queryWithId),
  ],
  getUser
);

// GET / :: GET ALL USERS
userRoute.get('/', getUsers);
