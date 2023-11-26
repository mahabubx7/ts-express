import { AuthPolicy, PermissionPolicy } from "@core";

const policy = new PermissionPolicy('todo_data');

policy
  .grant('user')
    .create()
    .readOwn()
    .custom('read:list')
    .updateOwn()
    .deleteOwn()

  .grant('admin')
    .extend('user')
    .read()
    .readAny()
    .update()
    .delete()

  .grant('super_admin')
    .extend('admin')

export const todoDataPolicy: AuthPolicy = policy.getPolicy();


