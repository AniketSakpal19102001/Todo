import mongoose, { Schema } from "mongoose";

const todoItemSchema = new Schema({
    todo_item: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
});

const todoSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    todo: {
        type: [todoItemSchema],
        default: []
    }
});

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
export {todoItemSchema}
