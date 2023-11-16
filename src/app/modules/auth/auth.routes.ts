import passport from "passport";
import { Router } from "express";
import { AuthGuard, DtoGuard } from "@guards";
import { changePassword, forgotPassword, loginUser, passwordReset, registerUser } from "./auth.controller";
import { changePasswordDto, forgotPasswordDto, loginUserDto, registerUserDto, resetPasswordDto } from "./dto";

export const authRoute = Router();

// user login :: POST /login
authRoute.post('/login', [
  DtoGuard(loginUserDto),
  passport.authenticate('local', { session: false }),
], loginUser);

// user register :: POST /register
authRoute.post('/register', [
  DtoGuard(registerUserDto),
], registerUser);

// password change :: PUT /change-password (#Auth:required)
authRoute.put('/change-password', [
  DtoGuard(changePasswordDto),
  AuthGuard('accessJwt'),
], changePassword);

// user forget-password/send-mail
// POST /forgot-password
authRoute.post('/forgot-password', [
  DtoGuard(forgotPasswordDto),
], forgotPassword);

// user forget-password/verify_n_update:change_password
// PUT /password-reset
authRoute.put('/password-reset', [
  DtoGuard(resetPasswordDto),
], passwordReset);

