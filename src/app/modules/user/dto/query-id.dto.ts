import { z } from 'zod'
import { isValidObjectId } from 'mongoose'

export const queryWithId = z.object({
  params: z.object({
    id: z.custom(isValidObjectId),
  }),
  query: z.object({
    id: z.custom(isValidObjectId),
  }),
});
