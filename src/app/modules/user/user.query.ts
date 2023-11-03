import { Model, ObjectId } from "mongoose";
import { User, UserModel } from "./user.model";

class UserQuery {
  private readonly mongo: Model<User, any, any>;

  constructor() {
    this.mongo = UserModel;
  }

  async getUsers(): Promise<User[]> {
    return await this.mongo.find({}).select('-__v -password');
  }

  async getUser(id: ObjectId | string): Promise<User | null> {
    return await this.mongo.findById(id).select('-__v -password');
  }

  async getUserData(id: ObjectId | string): Promise<User | null> {
    return await this.mongo.findById(id).select('-__v');
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.mongo.findOne({ email }).select('-__v -password');;
  }

  async addUser(user: User): Promise<User | null> {
    return await this.mongo.create(user);
  }

  async updateUser(id: ObjectId | string, user: Partial<User>): Promise<User | null> {
    return await this.mongo.findByIdAndUpdate(id, user);
  }

  async removeUser(id: ObjectId | string): Promise<User | null> {
    return await this.mongo.findByIdAndUpdate(id, { isDeleted: true });
  }
}

export const userQuery = new UserQuery();
