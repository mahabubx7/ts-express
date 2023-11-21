import { Redis } from "ioredis"

export interface ThrottlerOptions {
  rememberPeriod: number
  max: number
  ip?: string
  userId?: string
  store: Redis,
};
