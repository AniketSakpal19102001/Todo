import express from "express";
import { handleLogin, handleLogout, handleRegister } from "../controllers/authController.js";

const router = express.Router();

router.get("/", (req, res)=> res.send("Todo api ...."))
router.post("/register", handleRegister)
router.post("/login", handleLogin)
router.post("/logout", handleLogout)

export default router