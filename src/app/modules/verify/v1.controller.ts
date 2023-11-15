import { Controller, NotFoundException, getFromRedis } from "@core";
import { verifyQuery } from "./verify.query";

export const verifyEmail: Controller = async (req, res) => {
  const { query } = req;

  const token = String(query.token)

  if (!token) {
    throw new NotFoundException('Invalid or Expired token!', {
      issues: [
        'Token not found!',
      ]
    })
  }

  const getData = await getFromRedis(token)

  if (getData.tokenType && getData.tokenType !== 'email_verify' && getData.userId) {
    throw new NotFoundException('Corrupted token!', {
      issues: [
        'Token is corrupted!',
        'Token type didn\'t matched!'
      ]
    })
  }

  await verifyQuery.userVerify(getData.userId, {
    makeActive: true,
  })


  res.toJson(
    { message: 'Email is now verified successfully!' },
    null,
    202, // accepted
    'Email verified!'
  );
};
