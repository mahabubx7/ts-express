// import { Options } from "express-rate-limit";
// import RedisStore from "rate-limit-redis";
import { ThrottlerOptions, redis } from "@core";

export const ThrottlerConfigOptions: ThrottlerOptions = {
  store: redis, // storage with redis
  rememberPeriod: 60000, // Default: 60 * 1000 => 60 sec,
  max: 30, // Default
  ip: `throttler:_`, // Will change at Middleware: Replace `_` into user IP
  userId: '', // if developer chooses to handle it by user Ids [Optional]
};

// export type RateLimiterOptions = Partial<Options>;

// default configurations
// const throttlerConfig: RateLimiterOptions = {
//   windowMs: 60000, // 1 min
//   limit: 60, // max 60 requests per min.
//   standardHeaders: true,
//   legacyHeaders: false,
//   message: JSON.stringify({
//     message: 'Slow down man! You are making too many requests at once.',
//     data: null,
//     error: {
//       issues: ['Request limit exceeded!']
//     },
//   }),
//   store: new RedisStore({
//     // @ts-expect-error - Known issue: the `call` function is not present in @types/ioredis
//     sendCommand: async (...args: string[]) => await redis.call([...args])
//   }),
// };

// // re-usable with custom options for each
// export const throttlerOptions = (
//   options?: Partial<Options>,
// ): RateLimiterOptions => {
//   return {
//     ...throttlerConfig,
//     ...options,
//   }
// };
