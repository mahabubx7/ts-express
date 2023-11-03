import { z } from 'zod'
import { typeCheckForRole } from '../user.role';


export const createUserDto = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name must be given!' })
      .min(3).max(100),
    email: z.string({ required_error: 'Email must be given!', })
      .email().min(7).max(100),
    password: z.string({ required_error: 'Password must be given!' })
      .min(6).max(255),
    role: z.custom(typeCheckForRole).optional(),
  }),
});
