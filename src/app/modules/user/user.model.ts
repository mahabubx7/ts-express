import { Schema, model, Document } from "mongoose"
import { Role } from "./user.role";

export interface User extends Document {
  name: string
  email: string
  password: string
  isDeleted: boolean
  role: Role
}


const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Role,
    default: Role.User,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export const UserModel  = model('User', userSchema);
