import { Router } from "express";
import { AuthGuard, DtoGuard, PermissionGuard } from "@guards";
import { addUser, getUser, getUserProfile, getUsers, removeUser, updateUser } from "./v1.controller";
import { createUserDto, queryWithId, updateUserDto } from "./dto";
import { userDataPolicy } from "./user.policy";
import { UserModel } from "./user.model";

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
      action: ['update', 'update:own'], // i.e. user:can update:Own & admin:can update
      resource: userDataPolicy.resource,
      policy: userDataPolicy,
      options: {
        owner: {
          type: 'self_user',
          field: 'sub', // from jwt payload in req.user
        }
      },
    }),
  ],
  updateUser
);

// DELETE / :: REMOVE A USER
userRoute.delete('/:id',
  [
    DtoGuard(queryWithId),
    AuthGuard('accessJwt'),
    PermissionGuard({
      action: 'delete:any', // i.e. only admins/superAdmin have it
      resource: userDataPolicy.resource,
      policy: userDataPolicy,
    }),
  ],
  removeUser
);

// GET /:id :: GET ONE USERS
userRoute.get('/:id',
  [
    DtoGuard(queryWithId),
    AuthGuard('accessJwt'),
    PermissionGuard({
      action: 'read', // i.e. from vendor to all | except 'user'
      resource: userDataPolicy.resource,
      policy: userDataPolicy,
    }),
  ],
  getUser
);

// GET / :: GET ALL USERS
userRoute.get('/', [
  AuthGuard('accessJwt'), // for Authentication
  PermissionGuard({
    action: 'read:any', // i.e. only admins/superAdmin have it
    resource: userDataPolicy.resource,
    policy: userDataPolicy,
  }),
], getUsers);

