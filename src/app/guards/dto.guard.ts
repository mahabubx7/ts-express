import { DtoException, Guard } from "@core";
import { AnyZodObject } from "zod";

export const DtoGuard = (schema: AnyZodObject): Guard => {
  return async (req, _, next) => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      req.parsed = parsed;
      return next(); // if all ok
    } catch(err: any) {
      throw new DtoException('Please provide all of the required data!', err.issues);
    }
  };
};
