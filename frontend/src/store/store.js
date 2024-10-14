
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../store/slice/todoSlice';
import authReducer from '../store/slice/authSlice'

const store = configureStore({
  reducer: {
    todos: todoReducer,
    auth: authReducer
  },
});

export default store;
