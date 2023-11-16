import { Model, ObjectId } from "mongoose";
import { Todo, TodoModel } from "./todo.model";


class TodoQuery {
  private readonly mongo: Model<Todo, any, any>;

  constructor() {
    this.mongo = TodoModel;
  }

  async getTodos(): Promise<Todo[]> {
    return await this.mongo.find({}).select('-__v');
  }

  // get a list todos per user/owner/author
  async getTodoList(userId: ObjectId): Promise<Todo[]> {
    return await this.mongo.find({ author: userId, isDeleted: false }).select('-__v');
  }

  async getTodo(id: ObjectId | string): Promise<Todo | null> {
    return await this.mongo.findById(id);
  }

  async createTodo(todo: Todo) {
    return await this.mongo.create(todo);
  }

  async updateTodo(id: ObjectId | string, todo: Partial<Todo>) {
    return await this.mongo.findByIdAndUpdate(id, todo, { new: true });
  }

  async deleteTodo(id: ObjectId | string) {
    return await this.mongo.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  };
}

export const todoQuery = new TodoQuery();
