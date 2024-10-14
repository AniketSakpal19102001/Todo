import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const fetchTodos = createAsyncThunk('fetchTodos', async()=>{
  const response = await axios.get("http://localhost:3000/todo", {
    withCredentials: true,
  });
  return response.data;
})

const addTodo = createAsyncThunk('addTodo', async (todo_item) => {
  const response = await axios.post("http://localhost:3000/todo/add", {
    todo_item:todo_item
  }, {
    withCredentials: true,
  });
  return response.data; 
});

const toggleTodo = createAsyncThunk('toggleTodo', async (id) => {
  const response = await axios.patch(`http://localhost:3000/todo/editstatus/${id}`, {}, {
    withCredentials: true,
  });
  return response.data;
});

const removeTodo = createAsyncThunk('removeTodo', async (id) => {
  await axios.delete(`http://localhost:3000/todo/delete/${id}`, {
    withCredentials: true,
  });
  return id; 
});


const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    isLoading: false,
    isError: false,
    items: [],
  },
  reducers: {
  },
  extraReducers: (builder) =>{
    builder
    .addCase(fetchTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    })
    .addCase(fetchTodos.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchTodos.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    })
    .addCase(addTodo.fulfilled, (state, action) => {
      state.items.push(action.payload); 
    })
    .addCase(toggleTodo.fulfilled, (state, action) => {
      const todo = state.items.find(item => item.id === action.payload.id);
      if (todo) {
        todo.completed = action.payload.completed;
      }
    })
    .addCase(removeTodo.fulfilled, (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    });
  }
});


export { fetchTodos, addTodo, toggleTodo, removeTodo }

export default todoSlice.reducer;
