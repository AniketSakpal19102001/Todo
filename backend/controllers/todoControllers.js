import Todo from "../modal/todo.js";

const showTodo = async(req, res)=>{
    try {
        const {userId} = req.user;
       const todo =  await Todo.findById({_id: userId});
        res.json(todo.todo);
    } catch (e) {
        res.send(e)
        console.log(e);
        
    }
}
const addTodoItem = async (userId, todoItem) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            userId,
            { $push: { todo: todoItem } },
            { new: true, runValidators: true }
        );

        return updatedTodo;
    } catch (error) {
        throw new Error('Error adding todo item: ' + error.message);
    }
};

const addTodo = async (req, res) => {
    const {userId} = req.user;
    const { todo_item } = req.body; 

    const newTodoItem = { todo_item  };

    try {
        const updatedTodo = await addTodoItem(userId, newTodoItem);
        
        if (!updatedTodo) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedTodo);
    } catch (e) {
        res.status(500).send(e.message);
        console.log(e);
    }
};

const editStatusTodoItemByTodoItem = async (userId, todoItemString) => {
    try {
        const todoItem = await Todo.findOne(
            { _id: userId, 'todo.todo_item': todoItemString },
            { 'todo.$': 1 } 
        );

        if (!todoItem) return null;

        const currentStatus = todoItem.todo[0].status; 
        const newStatus = !currentStatus;

        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: userId, 'todo.todo_item': todoItemString },
            { $set: { 'todo.$.status': newStatus } },
            { new: true, runValidators: true }
        );

        return updatedTodo;
    } catch (error) {
        throw new Error('Error editing todo status: ' + error.message);
    }
};

const editStatusTodo = async (req, res) => {
    const { userId } = req.user; 
    const todoItemString = req.params.todoItem; 

    try {
        const updatedTodo = await editStatusTodoItemByTodoItem(userId, todoItemString);
        
        if (!updatedTodo) {
            return res.status(404).json({ message: 'User or Todo not found' });
        }

        res.json(updatedTodo);
    } catch (e) {
        res.status(500).send(e.message);
        console.log(e);
    }
};



const deleteTodoItem = async (userId, todoId) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            userId,
            { $pull: { todo: { _id: todoId } } },
            { new: true }
        );

        return updatedTodo;
    } catch (error) {
        throw new Error('Error deleting todo item: ' + error.message);
    }
};

const deleteTodo = async (req, res) => {
    const {userId} = req.user; 
    const todoId = req.params.todoId; 

    try {
        const updatedTodo = await deleteTodoItem(userId, todoId);
        
        if (!updatedTodo) {
            return res.status(404).json({ message: 'User or Todo not found' });
        }

        res.json(updatedTodo);
    } catch (e) {
        res.status(500).send(e.message);
        console.log(e);
    }
};


export { showTodo, addTodo, deleteTodo, editStatusTodo } 