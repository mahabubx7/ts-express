import { ObjectId } from "mongoose";
import { User, UserQuery, userQuery } from "@modules";
import { CustomException } from "@core";

interface IVerifyUserData {
  makeActive?: boolean
  makeEmailStatusReset?: boolean;
}

interface IUserVerifyReturn {
  message: string
  activated: boolean
  isEmailVerified: boolean
}

class VerifyQuery {
  private readonly user: UserQuery;

  constructor() {
    this.user = userQuery;
  }

  async userVerify(
    id: string | ObjectId,
    data: IVerifyUserData
    ): Promise<IUserVerifyReturn | void> {
    await this.user.updateUser(id, {
      isEmailVerified: !data.makeEmailStatusReset ?? true,
      isActive: data.makeActive ?? false,
    }).then((_) => {
      return {
        message: '',
        activated: _?.isActive,
        isEmailVerified: _?.isEmailVerified,
      }
    }).catch((err) => {
      throw new CustomException(
        'Something went wrong!',
        500,
        'VERIFY_ERROR',
        err
      );
    })
  }
}

export const verifyQuery = new VerifyQuery();
