import express from "express";
import { getUser, updateUser } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/authentication.middlewares.js";
import upload from "../config/multer.js";

const userRouter = express.Router();

userRouter.get("/get-user", authMiddleware, getUser);

userRouter.put(
  "/update-user",
  authMiddleware,
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "coverPicture", maxCount: 1 },
  ]),
  updateUser
);

export default userRouter;
