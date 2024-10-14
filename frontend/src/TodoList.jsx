import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTodo, removeTodo, fetchTodos } from "./store/slice/todoSlice";

const TodoList = () => {
  const todoList = useSelector((state) => state.todos);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <>
      <div>
        <ul className=" mx-5">
          {todoList.items.map((todo, index) => (
            <li key={todo._id}>
              <span
                style={{
                  textDecoration: todo.status ? "line-through" : "none",
                }}
                onClick={() => {
                  dispatch(toggleTodo(todo.todo_item)).then(() =>
                    dispatch(fetchTodos())
                  );
                }}
              >
                {todo.todo_item}
              </span>
              <button
                className="-mr-16"
                onClick={() => {
                  dispatch(removeTodo(todo._id)).then(() =>
                    dispatch(fetchTodos())
                  );
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TodoList;
