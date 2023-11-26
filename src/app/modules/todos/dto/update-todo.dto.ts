import { isValidObjectId } from 'mongoose';
import { z } from 'zod'

export const updateTodoDto = z.object({
  body: z.object({
    title: z.string().min(8).max(100).optional(),
    completed: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
  }),
  params: z.object({
    id: z.custom(isValidObjectId),
  }),
});
