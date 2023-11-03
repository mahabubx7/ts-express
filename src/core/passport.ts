import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from 'passport-local'
import { JWT_SECRET } from "@config";


export function setupPassportPlugins() {
  // ::::::::::::: JWT Strategy ::::::::::::: //
  passport.use(
    'jwt',
    new JwtStrategy({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    }, (jwtPayload, cb) => {
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
    }, (username, password, cb) => {
      // validate user login here
      console.log(username, password)
      // cb(null, false) // if not valid user
      // cb(null, userInfo); // if validated
    }),
  );


  // ::::::::::::: Google Strategy ::::::::::::: //

}
