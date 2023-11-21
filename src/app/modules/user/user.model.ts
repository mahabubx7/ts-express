import { Schema, model, Document } from "mongoose"
import { Role } from "./user.role";
import { hashPassword } from "@core";

export interface User extends Document {
  name: string
  email: string
  password: string
  isDeleted: boolean
  role: Role
  profile: {
    photo: string
    age?: number
    gender?: string
    address?: {
      line_1: string
      line_2?: string
      zip_code: string
      state: string
      country: string
    }
  };
  isEmailVerified: boolean
  isActive: boolean
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
  profile: {
    type: Object,
    default: {
      photo: 'user.png',
    },
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// hash the password
userSchema.pre('save', async function (next) {
  const user = this as User;
  if (!user.isModified('password')) {
    return next();
  }

  try {
    user.password = await hashPassword(user.password);
    next();
  } catch (err: any) {
    return next(err);
  }
});

export const UserModel  = model('User', userSchema);
