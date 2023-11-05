import { User } from "@modules";
import { ObjectId } from "mongoose";

export interface UserAuthData {
  _id?: any | ObjectId
  data: User | Partial<User>
  accessToken: string
  refreshToken: string
  ua?: string
  ip?: string
}
