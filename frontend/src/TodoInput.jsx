import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, fetchTodos } from "./store/slice/todoSlice";

const TodoInput = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(addTodo(input)).then(() => dispatch(fetchTodos()));
      setInput("");
    }
  };

  return (
    <>
      <div className="form">
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          value={input}
        />
        <button onClick={handleSubmit}>
          <span>Add</span>
        </button>
      </div>
    </>
  );
};

export default TodoInput;
