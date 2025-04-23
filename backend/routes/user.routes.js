import express from "express";
import {
  Followers,
  Following,
  getUser,
  updateUser,
} from "../controllers/user.controller.js";
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

userRouter.put("/following/:id", authMiddleware, Following);
userRouter.put("/followers/:id", authMiddleware, Followers);

export default userRouter;
