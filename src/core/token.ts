import crypto from 'node:crypto';
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { APP_SECRET, JWT_SECRET } from "@config";
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
  tokenType: 'access_token' | 'refresh_token' | 'passport',
  ua?: string,
  ip?: string | undefined,
}

export class Token {
  private readonly jwtSecret: string;
  private readonly appSecret: string;

  constructor() {
    this.jwtSecret = JWT_SECRET;
    this.appSecret = APP_SECRET;
  }

  genToken() {
    return crypto.randomUUID();
  }

  generateJwt({ data, expires }: JwtTokenGenOptions) {
    return sign(data, this.jwtSecret, {
      expiresIn: expires ?? '24h',
    });
  }

  decodeJwt(token: string, ignoreExpiration?: boolean): string | JwtPayload | TokenDataType {
    return verify(token, this.jwtSecret, {
      ignoreExpiration: ignoreExpiration ?? false,
    });
  }
}
