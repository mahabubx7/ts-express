import { Model, ObjectId } from "mongoose";
import { User, UserModel } from "./user.model";

export class UserQuery {
  private readonly mongo: Model<User, any, any>;

  constructor() {
    this.mongo = UserModel;
  }

  async getUsers(): Promise<User[]> {
    return await this.mongo.find({ isDeleted: false, isActive: true }).select('-__v -password');
  }

  async getUser(id: ObjectId | string): Promise<User | null> {
    return await this.mongo.findById(id).select('-__v -password');
  }

  async getUserData(id: ObjectId | string): Promise<User | null> {
    return await this.mongo.findById(id).select('-__v');
  }

  async userLogin(email: string): Promise<User | null> {
    return await this.mongo.findOne({ email, isDeleted: false, }).select('-__v');
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.mongo.findOne({ email }).select('-__v -password');
  }

  async addUser(user: User): Promise<User> {
    return await this.mongo.create(user);
  }

  async updateUser(id: ObjectId | string, user: Partial<User>): Promise<User | null> {
    return await this.mongo.findByIdAndUpdate(id, user, { new: true }).select('-__v -password');
  }

  async updateUserPhoto(id: ObjectId | string, photo: string) {
    return await this.mongo.updateOne({
      _id: id,
    }, {
      $set: {
        'profile.photo': photo
      }
    });
  }

  async removeUser(id: ObjectId | string): Promise<User | null> {
    return await this.mongo.findByIdAndUpdate(id, { isDeleted: true }, { new: true }).select('-__v -password');
  }
}

export const userQuery = new UserQuery();
