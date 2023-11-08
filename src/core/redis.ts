import { REDIS_HOST, REDIS_PORT } from "@config";
import { CustomException, NotFoundException } from "./errors";
import Redis from "ioredis";

export const redisOptions = {
  host: REDIS_HOST,
  port: REDIS_PORT,
};

export const redis = new Redis(redisOptions);

export const addToRedis = async (key: string, value: any, exp?: number) => {
  try {
    await redis.set(key, JSON.stringify(value));
    await redis.expire(key, exp ?? 30 * 60); // default: 30m
  } catch (err) {
    console.error(err)
    throw new CustomException(
      'Inserting in REDIS got error!', 500, 'REDIS_ERROR', err
    );
  }
};

export const getFromRedis = async (key: string) => {
  try {
    const raw = await redis.get(key);
    if (!raw) {
      throw new NotFoundException('Not found!', {
        issues: [
          'Record not found in redis'
        ]
      });
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error(err)
    throw new CustomException(
      'Fetching in REDIS got error!', 500, 'REDIS_ERROR', err
    );
  }
};
