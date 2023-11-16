import { Schema, model, Document, ObjectId } from "mongoose"

export interface Todo extends Document {
  title: string
  completed: boolean
  isDeleted: boolean
  author: ObjectId
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
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true});

export const TodoModel  = model('Todo', todoSchema);
