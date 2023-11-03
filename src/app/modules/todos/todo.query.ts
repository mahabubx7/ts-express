import { Model } from "mongoose";
import { Todo, TodoModel } from "./todo.model";


class TodoQuery {
  private readonly mongo: Model<Todo, any, any>;

  constructor() {
    this.mongo = TodoModel;
  }

  async getTodos(): Promise<Todo[]> {
    return await this.mongo.find({}).select('-__v');
  }
}

export const todoQuery = new TodoQuery();
