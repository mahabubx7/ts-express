import { Router } from "express";
import { AuthGuard, DtoGuard, PermissionGuard } from "@guards";
import { addUser, getUser, getUserProfile, getUsers, removeUser, updateUser } from "./v1.controller";
import { createUserDto, queryWithId, updateUserDto } from "./dto";
import { userDataPolicy } from "./user.policy";

export const userRoute = Router(); // by default: v1

// GET / :: GET Authenticated User<Profile>
userRoute.get('/profile', [
  AuthGuard('accessJwt'),
  PermissionGuard({
    action: 'read:self:profile',
    resource: userDataPolicy.resource,
    policy: userDataPolicy,
  }),
], getUserProfile);


// POST / :: CREATE A USER
userRoute.post('/',
  [
    DtoGuard(createUserDto),
    AuthGuard('accessJwt'),
    PermissionGuard({
      action: 'create',
      resource: userDataPolicy.resource,
      policy: userDataPolicy,
    }),
  ],
  addUser
);

// PUT / :: UPDATE A USER
userRoute.put('/:id',
  [
    DtoGuard(updateUserDto),
    AuthGuard('accessJwt'),
    PermissionGuard({
      action: 'update', // should accept multiple :: // TODO i.e. 'update', 'update:own'
      resource: userDataPolicy.resource,
      policy: userDataPolicy,
      // TODO i.e. { 'role': { type: 'body', required: 'role:update:admin' } } :: can be proceed if have permission
      // options: {}, // for attribute based control
    }),
  ],
  updateUser
);

// DELETE / :: REMOVE A USER
userRoute.delete('/:id',
  [
    DtoGuard(queryWithId),
    AuthGuard('accessJwt'),
  ],
  removeUser
);

// GET /:id :: GET ONE USERS
userRoute.get('/:id',
  [
    DtoGuard(queryWithId),
    AuthGuard('accessJwt'),
  ],
  getUser
);

// GET / :: GET ALL USERS
userRoute.get('/', [
  AuthGuard('accessJwt'), // for Authentication
], getUsers);

