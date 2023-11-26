import { z } from 'zod'

export const changePasswordDto = z.object({
  body: z.object({
    old_password: z.string({ required_error: 'Old password must be given!' })
    .min(6).max(255),
    new_password: z.string({ required_error: 'New password must be given!' })
    .min(6).max(255),
    confirm_password: z.string({ required_error: 'Confirm password must be given!' })
    .min(6).max(255),
  }),
});
