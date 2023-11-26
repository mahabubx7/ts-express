import { Role, User } from "@modules";
import { Document, Model, ObjectId } from "mongoose";
import { AuthenticateOptions } from "passport";
import { AuthPolicy } from "../policy";

export interface UserAuthData {
  _id?: any | ObjectId
  data: User | Partial<User>
  accessToken: string
  refreshToken: string
  ua?: string
  ip?: string
}


export interface AuthGuardOptions {
  type: 'local' | 'accessJwt' | 'refreshJwt' | 'apiKey'; // required :: Passport.js auth types
  passportOptions?: AuthenticateOptions
}

export interface PermissionGuardArgs {
  action: string | string[];
  resource: string;
  policy: AuthPolicy;
  options?: {
    owner?: {
      type: 'self_user' | 'resource'
      entity?: Model<any, any, any>
      field?: string
    }
  };
}
