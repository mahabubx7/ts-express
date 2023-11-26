import { isValidObjectId } from 'mongoose';
import { z } from 'zod'

export const queryWithId = z.object({
  params: z.object({
    id: z.custom(isValidObjectId),
  }),
  query: z.object({
    id: z.custom(isValidObjectId),
  }),
});
