import { CookieOptions } from "express";

export const cookieOptions: CookieOptions = {
  sameSite: false,
  secure: false,
  httpOnly: true,
};
