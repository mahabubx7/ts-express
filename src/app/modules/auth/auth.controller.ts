import { Controller, Token, cookEmailHtml, makeMail, addToRedis } from '@core'
import { authQuery } from './auth.query';
import { cookieOptions } from '@config';
import { sentEmailVerification } from '@jobs';

export const loginUser: Controller = async (req, res) => {
  /**
   * @Passport
   * Passport middleware validates user
   * Validated info & others available in `req.user`
   */
  const { user } = req;

  res.cookie('access_token', user?.accessToken, cookieOptions);

  res.cookie('refresh_token', user?.refreshToken, cookieOptions);

  res.toJson(user?.data, null, 200, 'Login successful!');

};


export const registerUser: Controller = async (req, res) => {
  const { body } = req;

  const {
    data,
    accessToken,
    refreshToken
  } = await authQuery.registerUser(body, {
    ua: req.headers['user-agent'],
    ip: req.ip,
  });

  // sends verification email to active account
  const token = new Token().genToken()
  await makeMail({
    to: data.email,
    subject: 'Registration Successful!',
    html: cookEmailHtml(req, {
      name: data.name,
      linkPostfix: `/api/v1/verify/email?token=${token}`,
      linkExpire: (30 * 60 * 1000).toString(), // 30m
    }),
  }).then(async (mail) => {
    await sentEmailVerification({
      /**
       * @Queue *BullMQ*
       * Verify Email & Active account
       * Enqueue a task for sending email
       * It sends the verification link & registration welcome message!
       */
      mail: mail,
    }); // adding mail sending task into emailVerifyQueue
    addToRedis(token, {
      tokenType: 'email_verify',
      userId: data._id,
      makeActive: true,
    });
  });




  res.cookie('access_token', accessToken, cookieOptions);

  res.cookie('refresh_token', refreshToken, cookieOptions);

  res.toJson(data, null, 201, 'Registration successful!');
};
