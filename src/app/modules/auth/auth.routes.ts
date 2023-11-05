import { Router } from "express";
import { loginUser, registerUser } from "./auth.controller";
import { DtoGuard } from "src/app/guards";
import { loginUserDto, registerUserDto } from "./dto";
import passport from "passport";

export const authRoute = Router();

// user login :: POST /login
authRoute.post('/login', [
  DtoGuard(loginUserDto),
  passport.authenticate('local', { session: false }),
], loginUser);

// user register :: POST /register
authRoute.post('/register', [
  DtoGuard(registerUserDto),
  // passport.authenticate('local', { session: false }),
], registerUser);
