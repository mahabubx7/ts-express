import { NextFunction, Request } from "express";
import { AuthGuardOptions, CustomException, ForbiddenException, Guard, PermissionGuardArgs } from "@core";
import { isValidObjectId } from "mongoose";
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


async function validateOwner(
  request: Request,
  next: NextFunction,
  ownerOptions: PermissionGuardArgs['options'],
  checker: <T = string>(x: T, y: T) => boolean,
) {
    let status = false;
    const { user } = request;

    if (!user) {
      return next(new CustomException('Auth metadata not found!'));
    }

    console.log('We are in Validate Owner ...', user);

    const { id } = request.params;

    if (!id || !isValidObjectId(id)) {
      return next(new CustomException('Bad request!'));
    }

    if (ownerOptions && ownerOptions.owner) {
      console.log('We are in ownerOptions ...');
      // Owner handler
      const { type, entity, field } = ownerOptions.owner;
      console.log('What we got in ownerOptions ... ', { type, entity, field });
      //
      if (type === 'self_user') {
        // check current user for user_data
        console.log('SELF --- CHECK passed!');
        status = checker<string>(String(user.sub), id);
      }
      else if (type === 'resource') {
        console.log('We are in Resource Type:checker ...');
        // check owner of given resource
        if (!entity || !field) {
          return next(new CustomException('Auth metadata corrupted or invalid!'));
        }
        const getSourceData = await entity.findById(id);
        console.log('resource:checker had ... ', String(user.sub), String(getSourceData[field]));
        status = checker<string>(String(user.sub), String(getSourceData[field]));
        console.log('Resource Type:checker result => ', status);
      }

    }
    //
    return status;
}

export const PermissionGuard = (args: PermissionGuardArgs): Guard => {
  return async (_, __, next) => {
    const { action, resource, policy, options } = args;
    const { user } = _;

    if (!user?.role || !user.sub) {
      return next(new ForbiddenException('User metadata not found!'));
    }

    const { checkOwner, checkPermission, permissions } = policy;

    if (resource !== policy.resource) {
      return next(new ForbiddenException('Invalid resource metadata!', { issues: ['resource metadata couldn\'t be matched!'] }));
    }

    // action: string ------------------------------------
    if (typeof action === 'string') {

      if (action.includes(':own')) {
        const result = await validateOwner(_, next, options, checkOwner);
        console.log('The result ... ', result);
        if (!result) {
          return next(new ForbiddenException('Sorry! you\'re not the owner!')); //
        } else if (result && checkPermission(user.role, action, permissions)) {
          return next(); // accepted to proceed
        }
      }

      // normal permission checks
      else if (checkPermission(user.role, action, permissions)) {
        return next(); // accepted to proceed
      }

      // if there is no matched action to its permissions
      return next(new ForbiddenException('Access denied!', { issues: ['You don\'t have the permission for this action'] }))
    }

    // action: string[] ----------------------------------
    else if (typeof action === 'object' && action.length > 0) {
      // iterate given actions and verify permissions
      for (const _action of action) {
        // check owner first
        if (_action.includes(':own')) {
          const result = await validateOwner(_, next, options, checkOwner);
          console.log('The result ... ', result);
          if (!result) {
            return next(new ForbiddenException('Sorry! you\'re not the owner!')); //
          } else if (result && checkPermission(user.role, _action, permissions)) {
            return next(); // accepted to proceed
          }
        }

        // normal permission checks
        else if (checkPermission(user.role, _action, permissions)) {
          return next(); // accepted to proceed
        }
      }

      // if there is no matched action to its permissions
      return next(new ForbiddenException('Access denied!', { issues: ['You don\'t have the permission for this action'] }))
    }

    next(); // all ok
  };
};
