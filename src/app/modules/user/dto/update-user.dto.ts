import { z } from 'zod'
import { isValidObjectId } from 'mongoose'
import { typeCheckForRole } from '../user.role';

export const updateUserDto = z.object({
  body: z.object({
    name: z.string().min(3).max(100).optional(),
    email: z.string().email().min(7).max(100).optional(),
    password: z.string().min(6).max(255).optional(),
    role: z.custom(typeCheckForRole).optional(),
  }),
  params: z.object({
    id: z.custom(isValidObjectId),
  }),
});
