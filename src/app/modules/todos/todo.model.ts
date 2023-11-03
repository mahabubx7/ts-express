import { type } from "os";
import { Schema, model, Document } from "mongoose"

export interface Todo extends Document {
  title: string
  completed: boolean
  isDeleted: boolean
}


const todoSchema = new Schema<Todo>({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export const TodoModel  = model('Todo', todoSchema);
