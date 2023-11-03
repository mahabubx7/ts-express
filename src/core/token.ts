import { sign, verify } from "jsonwebtoken";
import { JWT_SECRET } from "@config";

export const generateJwt = (data: object, expires?: string) => {
  return sign(data, JWT_SECRET, {
    expiresIn: expires ?? '24h',
  });
};

export const decodeJwt = (token: string, ignoreExpiration?: boolean) => {
  return verify(token, JWT_SECRET, {
    ignoreExpiration: ignoreExpiration ?? false,
  });
};
