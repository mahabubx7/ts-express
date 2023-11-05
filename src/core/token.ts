import { sign, verify } from "jsonwebtoken";
import { JWT_SECRET } from "@config";
import { ObjectId } from "mongoose";
import { Role } from "@modules";

interface JwtTokenGenOptions {
  data: TokenDataType,
  expires?: string
}

export interface TokenDataType {
  sub: ObjectId, // mongodb document @ID type
  email?: string,
  role?: Role,
  tokenType: 'access_token' | 'refresh_token',
  ua?: string,
  ip?: string | undefined,
}

export class Token {
  private readonly jwtSecret: string;

  constructor() {
    this.jwtSecret = JWT_SECRET;
  }

  generateJwt({ data, expires }: JwtTokenGenOptions) {
    return sign(data, this.jwtSecret, {
      expiresIn: expires ?? '24h',
    });
  }

  decodeJwt(token: string, ignoreExpiration?: boolean) {
    return verify(token, this.jwtSecret, {
      ignoreExpiration: ignoreExpiration ?? false,
    });
  }
}
