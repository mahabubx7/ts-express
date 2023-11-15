import { AuthPolicy, PermissionPolicy } from "@core";

const policy = new PermissionPolicy('user_data');

policy
  .grant('user')
    .custom('read:self:profile')
    .updateOwn()
  .grant('vendor')
    .extend('user')
    .read()
    .readAny()
  .grant('admin')
    .extend('vendor')
    .create()
    .update()
    .delete()
    .custom('delete:vendor')
    .deny('read:self:profile') // # Test for ADMINs: read:profile not allowed
  .grant('super_admin')
    .extend('admin')
    .deleteAny()
    .custom('update:role')
    .custom('delete:admin')

export const userDataPolicy: AuthPolicy = policy.getPolicy();


