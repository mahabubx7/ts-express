import { z } from 'zod'

export const forgotPasswordDto = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email must be given!', })
      .email().min(7).max(100)
  }),
});
