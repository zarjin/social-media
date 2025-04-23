import express from "express";
import {
  checkAuth,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/authentication.middlewares.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/logout", authMiddleware, logout);
authRouter.get("/check-auth", authMiddleware, checkAuth);

export default authRouter;
