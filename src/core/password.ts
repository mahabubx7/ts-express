import argon2, { argon2d } from 'argon2'
import { HASH_SECRET } from '@config';

export const hashPassword = async (password: string) => {
  return await argon2.hash(password, {
    type: argon2d,
    memoryCost: 2 ** 16,
    hashLength: 50,
    secret: Buffer.from(HASH_SECRET),
  });
};

export const verifyPassword = async (password: string, hash: string) => {
  return await argon2.verify(hash, password, {
    type: argon2d,
    secret: Buffer.from(HASH_SECRET),
  });
};
