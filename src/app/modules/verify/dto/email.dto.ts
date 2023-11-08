import { z } from "zod";

export const verifyEmailDto = z.object({
  query: z.object({
    token: z.string().min(8),
  }),
});
