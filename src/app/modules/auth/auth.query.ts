import { User, userQuery } from '@modules'
import { Token, TokenDataType, CustomException, NotFoundException, verifyPassword } from '@core';

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
}

export const authQuery = new AuthQuery();
