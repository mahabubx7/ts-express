import { z } from 'zod'

export const createTodoDto = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title must be given!' })
      .min(8).max(100),
  }),
});
