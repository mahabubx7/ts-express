import { User, userQuery } from '@modules'
import { Token, TokenDataType, CustomException, NotFoundException, verifyPassword, ForbiddenException } from '@core';
import { ObjectId } from 'mongoose';

class AuthQuery {
  private readonly token: Token;

  constructor() {
    this.token = new Token();
  }

  async addNewUser(user: User) {
    const newUser = await userQuery.addUser(user);

    if (newUser === null || !newUser._id) {
      throw new Error('Internal Server Error!');
    }

    return {
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      isDeleted: newUser.isDeleted,
    }
  }

  async getUserData(id: ObjectId | string) {
    return await userQuery.getUserData(id);
  }

  async getUserDataByEmail(email: string) {
    return await userQuery.getUserByEmail(email);
  }

  async loginUser(email: string, pass: string) {
    try {
      const user = await userQuery.userLogin(email);
      if (!user || !user.password) {
        throw new NotFoundException('User not found!', { email });
      }
      const IsPasswordVerified = await verifyPassword(pass, user.password);
      if (!IsPasswordVerified) {
        return false; // will be caught in passport-middleware
      }
      const jwtData: TokenDataType = {
        sub: user._id,
        email: user.email,
        role: user.role,
        tokenType: 'access_token'
      };

      return {
        data: {
          _id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          isDeleted: user.isDeleted,
        },
        accessToken: this.token.generateJwt({
          data: jwtData,
          expires: '7d',
        }),
        refreshToken: this.token.generateJwt({
          data: { ...jwtData, tokenType: 'refresh_token' },
          expires: '30d',
        }),
      };
    } catch (err) {
      throw new CustomException(
        'Login failed!',
        500,
        'LOGIN_FAILED',
        err
      )
    }
  }

  async registerUser(user: User, extra?: { ua?: string, ip?: string | undefined}) {
    try {
      const newUser = await this.addNewUser(user);
      const jwtData: TokenDataType = {
        sub: newUser._id,
        email: newUser.email,
        role: newUser.role,
        tokenType: 'access_token'
      };

      if (extra && extra.ua) jwtData.ua = extra.ua
      if (extra && extra.ip) jwtData.ip = extra.ip

      return {
        data: newUser,
        accessToken: this.token.generateJwt({
          data: jwtData,
          expires: '7d',
        }),
        refreshToken: this.token.generateJwt({
          data: { ...jwtData, tokenType: 'refresh_token' },
          expires: '30d',
        }),
      };
    } catch (err) {
      throw new CustomException(
        'Registration failed!',
        500,
        'REG_FAILED',
        err
      )
    }
  }


  async changePassword(id: ObjectId | string, body: {
    old_password: string,
    new_password: string,
    confirm_password: string,
  }) {
    const {
      old_password,
      new_password,
      confirm_password,
    } = body;

    if (new_password !== confirm_password) {
      throw new CustomException('Bad request!', 406, 'BAD_INPUT', { issues: ['confirm-password isn\'t matching'] });
    }

    const user = await this.getUserData(id);
    if (!user) {
      throw new NotFoundException('User doesn\'t exists!');
    }
    console.log('Debug ===> ', old_password, user.password);
    const checkOldPassword = await verifyPassword(old_password, user.password);
    if (!checkOldPassword) {
      throw new ForbiddenException('Access denied!', { issues: ['Wrong credentials!'] });
    }
    else if (new_password === old_password) {
      return { message: 'No need to change! They are same.', status: 'no_change' };
    }

    try {
      // all ok: change the password
      user.password = new_password;
      await user.save(); // mongoose pre-save interceptor will hash this again
      return {
        message: 'Password is changed successfully!',
        user,
        status: 'changed'
      };
    } catch (err: any) {
      throw new CustomException('Something went wrong!', 500, 'CHANGE_PASS', err);
    }
  }

}

export const authQuery = new AuthQuery();
