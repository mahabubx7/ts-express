// import { AcPermissionOptions, ForbiddenException, Guard } from "@core";

// export const AccessPolicyGuard = (permissions: AcPermissionOptions): Guard => {
//   return async (req, _, next) => {
//     try {
//       const { user, body } = req;
//       if (!user || !user?.role) {
//         // if got no role info
//         next(new ForbiddenException('Forbidden!', {
//           issues: ['Role not found or corrupted user data!'],
//           details: user
//         }));

//         return;
//       }

//       const { policy, action, resource } = permissions;
//       // const access = policy.can(user.role)[action](resource).filter(_attrs);
//       const access = policy.permission({
//         role: user.role,
//         action,
//         resource,
//       });

//       if (!access.granted) {
//         // Not allowed
//         next(new ForbiddenException('Access Denied!', {
//           issues: [
//             'Authorization policy error!'
//           ],
//           details: policy.getGrants(),
//         }));

//         return;
//       }

//       if (Object.keys(access.filter(body)).length > 0) {
//         // attributes checks
//         console.log('ATTR --> ', access.attributes, access.filter(body));
//       }

//       next(); // if all ok
//     } catch(err: any) {
//       console.error(err);
//       next(err);
//     }
//   };
// };
