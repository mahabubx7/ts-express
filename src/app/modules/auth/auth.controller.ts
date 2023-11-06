import { Controller, CustomException, makeMail, sendMail } from '@core'
import { authQuery } from './auth.query';
import { cookieOptions } from '@config';

export const loginUser: Controller = async (req, res) => {
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

  // test mailer
    const mailInfo = await makeMail({
      to: data.email,
      subject: 'Registration Successful!',
      html: `
        <html>
          <head>
            <title>Registration Successful!</title>
          </head>
          <body>
            <h1>Dear, ${data.name}</h1>
            <h2>Registration Successful!</h2>
            <hr />
            <h3>Please verify your e-mail address to active your account</h3>
            <a href="http://localhost:5000/api">verify</a>
          </body>
        </html>
      `,
    });


  sendMail(mailInfo); // sending email

  res.cookie('access_token', accessToken, cookieOptions);

  res.cookie('refresh_token', refreshToken, cookieOptions);

  res.toJson(data, null, 201, 'Registration successful!');
};
