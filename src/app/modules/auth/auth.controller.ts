import { Controller, Token, cookEmailHtml, makeMail, addToRedis, CustomException, NotFoundException } from '@core'
import { authQuery } from './auth.query';
import { cookieOptions } from '@config';
import { addEmailToQueue, sentEmailVerification } from '@jobs';

export const loginUser: Controller = async (req, res) => {
  /**--------------------------------------------------
   * @Passport
   * Passport middleware validates user
   * Validated info & others available in `req.user`
   *---------------------------------------------------*/
  const { accessToken, refreshToken, jwtPayload } = req.state;

  req.user = jwtPayload;

  res.cookie('access_token', accessToken, cookieOptions);

  res.cookie('refresh_token', refreshToken, cookieOptions);

  res.toJson({
    id: jwtPayload?.sub,
    email: jwtPayload?.email,
    role: jwtPayload?.role,
    ip: jwtPayload?.ip,
    ua: jwtPayload?.ua,
  }, null, 200, 'Login successful!');

};


export const registerUser: Controller = async (req, res) => {
  const { body } = req.parsed;

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
      /**--------------------------------------------------------------
       * @Queue *BullMQ*
       * Verify Email & Active account
       * Enqueue a task for sending email
       * It sends the verification link & registration welcome message!
       *---------------------------------------------------------------*/
      mail: mail,
    }); // adding mail sending task into => 'emailVerifyQueue'
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

export const changePassword: Controller = async (req, res) => {
  const { body, user } = req;
  if (!user) {
    throw new CustomException('Auth metadata occurred an error');
  }

  const updated = await authQuery.changePassword(user.sub, body);
  if (updated.status === 'changed' && updated.user) {
    // password changed
    // notify user this update
    await makeMail({
      to: updated.user.email,
      subject: 'Password changed successfully!',
      html: cookEmailHtml(req, {
        name: updated.user.name,
        heading: 'Password changed successfully!',
        subHeading: 'Don\'t share this information!',
        raw: `
          <p>
            <code>
              Your New Password: ${body.new_password}
            </code>
          </p>
        `,
      }),
    }).then(async (mail) => {
      await addEmailToQueue({
        /**------------------------------------------------------
         * @Queue *BullMQ*
         * Send Email <Notify>
         * Enqueue a task for sending email
         * It sends the password change event:information
         *-------------------------------------------------------*/
        mail: mail,
      }); // adding mail sending task into => 'EmailSenderQueue'
    });
  }

  res.toJson(updated);
};

export const forgotPassword: Controller = async (req, res) => {
  const { body: { email } } = req;
  const user = await authQuery.getUserDataByEmail(email);
  if (!user) {
    throw new NotFoundException('No account was found with this email');
  }

  const token = new Token().genToken()
  await addToRedis(token, {
    tokenType: 'forgot_password',
    userId: user._id,
    email: email,
  });

  await makeMail({
    to: email,
    subject: 'Forgot Password - Reset!',
    html: cookEmailHtml(req, {
      name: 'Sir/Madam',
      heading: '!',
      subHeading: 'Please use this token to verify yourself and reset your password!',
      raw: `
        <div>
          <p>This token will be automatically expired just after 30 minutes</p>
          <em>Note: Don\'t take any extra or trailing spaces with your token while copy</em>
          <code>
            Your Token: ${token}
          </code>
        </div>
      `,
    }),
  }).then(async (mail) => {
    await addEmailToQueue({
      /**------------------------------------------------------
       * @Queue *BullMQ*
       * Send Email <Notify>
       * Enqueue a task for sending email
       * It sends the password change event:information
       *-------------------------------------------------------*/
      mail: mail,
    }); // adding mail sending task into => 'EmailSenderQueue'
  });

  res.toJson({ message: 'Reset-password request accepted!' }, null, 202);
};

export const passwordReset: Controller = async (req, res) => {
  //
};
