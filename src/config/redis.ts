import { createClient } from "redis";
import { IsProdMode, REDIS_HOST, REDIS_PORT } from "./variables";

export const redis = createClient({
  // username:
  // password:
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT,
    tls: IsProdMode,
    // key:
    // cert:
    // ca:
  },
});

redis.on('error', (err) => {
  console.error('🍎 REDIS client-error: ', err);
});


redis.on('connect', () => {
  console.error('🍎 REDIS connection is established!');
});
