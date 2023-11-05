import { z } from 'zod'

export const loginUserDto = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email must be given!', })
      .email().min(7).max(100),
    password: z.string({ required_error: 'Password must be given!' })
      .min(6).max(255),
  }),
});
