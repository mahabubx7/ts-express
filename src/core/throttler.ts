import { ThrottlerConfigOptions } from "@config";
import { Guard, ThrottlerOptions } from "./types";
import { CustomException } from "./errors";
import { redis } from "./redis";


interface ThrottleInfo {
  reqUrl: string
  hits: number
}

const getThrottleInfo = async (key: string): Promise<ThrottleInfo | null> => {
  const result = await redis.get(key);
  if (!result) return null;
  return JSON.parse(result);
};

const updateThrottleInfo = async (key: string, info: ThrottleInfo, expire?: number) => {
  const _info: ThrottleInfo = {
    ...info,
    hits: info.hits + 1,
  };

  await redis.set(key, JSON.stringify(_info), 'PX', expire ?? (3600 * 24));
  return true;
};

const setThrottleInfo = async (key: string, info: ThrottleInfo, expire?: number) => {
  await redis.set(key, JSON.stringify(info), 'PX', expire ?? (3600 * 24));
  return true;
};

/**--------------------------------------------------------
 * @Throttler <Custom>
 * @Params numOfRequests, memorize
 *---------------------------------------------------------*/

export const RequestThrottler = (
  /* numOfRequests: number  */
  numOfRequests: number = 30,
  /* memorize: number [mile seconds]  */
  memorize: number = 30000, // 30s
): Guard => {

  const config: ThrottlerOptions = {
    ...ThrottlerConfigOptions,
    max: numOfRequests,
    rememberPeriod: memorize,
  };

  return async (req, _, next) => {
    const {
      max,
      rememberPeriod,
      ip,
      // userId, // optional by default
    } = config;

    const key = ip ? ip.replace('_', String(req.ip)) : `throttler:${req.ip}`;
    const reqUrl = req.originalUrl;

    try {
      const findRecord = await getThrottleInfo(key);

      if (!findRecord || findRecord === null) {
        // create record
        const info: ThrottleInfo = {
          reqUrl,
          hits: 1,
        };
        await setThrottleInfo(key, info, rememberPeriod);
        return next();
      }

      const diff = max <= findRecord.hits;
      if (diff) {
        return next(
          new CustomException('Slow down cowboy!', 429, 'THROTTLER', {
            issues: [
              'Too many request!',
              'Request rate-limit exceeded!'
            ],
          }),
        );
      } else {
        await updateThrottleInfo(key, {
          ...findRecord,
          hits: findRecord.hits + 1,
        }, rememberPeriod);
      }

      next(); // proceed to next

    } catch (error) {
      return next(
        new CustomException('Something went wrong!', 500, 'THROTTLER', error),
      );
    }
  };
};
