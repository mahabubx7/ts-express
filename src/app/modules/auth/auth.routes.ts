import passport from "passport";
import { Router } from "express";
import { DtoGuard } from "@guards";
import { loginUser, registerUser } from "./auth.controller";
import { loginUserDto, registerUserDto } from "./dto";

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


// user user email_verification/active

// user forget-password/send-mail

// user forget-password/verify_n_update

