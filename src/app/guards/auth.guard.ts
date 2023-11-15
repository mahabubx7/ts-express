import { AuthGuardOptions, ForbiddenException, Guard, PermissionGuardArgs } from "@core";
import passport from "passport";


export const AuthGuard = (type: AuthGuardOptions['type'], options?: AuthGuardOptions['passportOptions']): Guard => {
  const _passportOptions = options ?? { session: false };
  return passport.authenticate(type, _passportOptions);
};

/**
 * @PermissionControl <CUSTOM>
 * @Policy based access-control
 * *STATUS*: Not completed yet! But, Role & Permissions are working well.
 */

export const PermissionGuard = (args: PermissionGuardArgs): Guard => {
  return async (_, __, next) => {
    const { action, resource, policy, options } = args;
    const { user } = _;

    if (!user?.role || !user.sub) {
      const e = new ForbiddenException('User metadata not found!');
      return next(e);
    }

    const { checkOwner, checkPermission, permissions } = policy;

    if (action.includes('own')) {
      console.log('YES ... | IT IS A == OWNER Checking request!!!')
      checkOwner('id', 'id'); // dummy for now :: coming soon!
      // TO BE IMPLEMENTED!
    }

    if (!checkPermission(user.role, action, permissions)) {
      const e = new ForbiddenException(
        'Access denied!',
        {
          issues: ['You don\'t have the permission for this action'],
          action,
        }
      );
      return next(e);
    }

    next(); // all ok
  };
};
