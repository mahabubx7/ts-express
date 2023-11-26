import { Request } from 'express'
import { PassportStatic } from "passport";
import { ExtractJwt, Strategy as JwtStrategy, VerifyCallback } from "passport-jwt";
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

  const AcJwtStrategyCallback: VerifyCallback = (payload, done) => {
    // console.log('acJwt', payload);
    done(null, payload);
  };

  const AcJwtStrategy = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([extractAccessToken]),
    secretOrKey: JWT_SECRET,
    ignoreExpiration: false,
  }, AcJwtStrategyCallback);

  passport.use('accessJwt', AcJwtStrategy);

  // ::::::::::::: JWT Strategy <RefreshToken> ::::::::::::: //
  passport.use(
    'refreshJwt',
    new JwtStrategy({
      jwtFromRequest: ExtractJwt.fromExtractors([extractRefreshToken]),
      secretOrKey: JWT_SECRET,
      ignoreExpiration: false,
    }, (jwtPayload, done) => {
      // console.log('rfJwt', jwtPayload);
      done(null, jwtPayload);
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
        _.state.accessToken = loginInfo.accessToken;
        _.state.refreshToken = loginInfo.refreshToken;
        _.state.ip = _.ip;
        _.state.ua = _.headers['user-agent'];
        const { _id, email, role  } = loginInfo.data;
        _.state.jwtPayload = {
          sub: _id,
          email,
          role,
          tokenType: 'passport',
        };
        done(null, { ..._.state.jwtPayload });
      }
    }),
  );


  // ::::::::::::: Google Strategy ::::::::::::: //
  // To Be Implemented ...
}
