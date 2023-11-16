import { z } from 'zod'

export const resetPasswordDto = z.object({
  query: z.object({
    token: z.string().min(8),
  }),
});
