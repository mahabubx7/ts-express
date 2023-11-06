import { redis } from "@config";
import { CustomException, NotFoundException } from "./errors";

export const addToRedis = async (key: string, value: any) => {
  try {
    await redis.set(key, JSON.stringify(value));
  } catch (err) {
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
    throw new CustomException(
      'Fetching in REDIS got error!', 500, 'REDIS_ERROR', err
    );
  }
};
