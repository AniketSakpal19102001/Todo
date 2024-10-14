import express from "express";
import { showTodo, addTodo, deleteTodo, editStatusTodo } from "../controllers/todoControllers.js";

const router = express.Router();

router.get("/", showTodo)
router.post("/add", addTodo)
router.delete("/delete/:todoId", deleteTodo)
router.patch("/editstatus/:todoItem", editStatusTodo)

export default router