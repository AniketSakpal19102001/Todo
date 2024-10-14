import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "./store/slice/authSlice";
import axios from "axios";
function Todo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleLogout() {
    const response = await axios.post(
      "http://localhost:3000/logout",
      {},
      {
        withCredentials: true,
      }
    );

    navigate("/");
    dispatch(logout());
  }
  return (
    <>
      <div className="body">
        <div className="nav">
          <div className="nav-flex">
            <span>Todo</span> <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <div className="container">
          <div className="heading">
            <h1>To-Do List</h1>
          </div>
          <TodoInput />
          <TodoList />
        </div>
      </div>
    </>
  );
}

export default Todo;
