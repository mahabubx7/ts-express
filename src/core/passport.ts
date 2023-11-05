import { Request } from 'express'
import { PassportStatic } from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from 'passport-local'
import { JWT_SECRET } from "@config";
import { authQuery } from '@modules';
import { UnauthorizedException } from './errors';

function extractAccessToken(req: Request) {
  if (req.cookies && 'access_token' in req.cookies) {
    return req.cookies['access_token']
  }

  return null;
}

function extractRefreshToken(req: Request) {
  if (req.cookies && 'refresh_token' in req.cookies) {
    return req.cookies['refresh_token']
  }

  return null;
}

// function extractApiAuthKey(req: Request) {
//   if (req.headers['x-api-key']) {
//     return req.headers['x-api-key'];
//   }

//   return null;
// }



export function setupPassportPlugins(passport: PassportStatic) {
  // ::::::::::::: JWT Strategy <AccessToken> ::::::::::::: //
  passport.use(
    'accessToken',
    new JwtStrategy({
      jwtFromRequest: ExtractJwt.fromExtractors([extractAccessToken]),
      secretOrKey: JWT_SECRET,
      ignoreExpiration: false,
    }, (jwtPayload, cb) => {
      console.log('acJwt', jwtPayload);
      cb(null, jwtPayload);
    }),
  );

  // ::::::::::::: JWT Strategy <RefreshToken> ::::::::::::: //
  passport.use(
    'refreshToken',
    new JwtStrategy({
      jwtFromRequest: ExtractJwt.fromExtractors([extractRefreshToken]),
      secretOrKey: JWT_SECRET,
      ignoreExpiration: false,
    }, (jwtPayload, cb) => {
      console.log('rfJwt', jwtPayload);
      cb(null, jwtPayload);
    }),
  );

  // ::::::::::::: Local Strategy ::::::::::::: //
  passport.use(
    'local',
    new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    }, async (_, username, password, done) => {
      // validate user login here
      const loginInfo = await authQuery.loginUser(username, password).catch(err => {
        console.error(err);
      });

      if (!loginInfo) {
        const err = new UnauthorizedException('Invalid credentials!', {
          issue: 'wrong password!'
        });
        done(err, false);
      } else {
        console.log('USER ==> ', loginInfo);
        done(null, {
          ...loginInfo,
          ua: _.headers['user-agent'],
          ip: _.ip,
        });
      }
    }),
  );


  // ::::::::::::: Google Strategy ::::::::::::: //
  // To Be Implemented ...
}
