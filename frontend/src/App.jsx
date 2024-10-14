// src/App.js
import React from "react";
import Todo from "./Todo";
import { Routes, Route, Outlet } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./Protectedroute";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/todo"
          element={
            <ProtectedRoute>
              <Todo />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Outlet />
    </>
  );
};

export default App;
