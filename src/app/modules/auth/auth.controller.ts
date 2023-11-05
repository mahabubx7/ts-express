import { Controller } from '@core'
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

  res.cookie('access_token', accessToken, cookieOptions);

  res.cookie('refresh_token', refreshToken, cookieOptions);

  res.toJson(data, null, 201, 'Registration successful!');
};
