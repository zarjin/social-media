import express from "express"
import upload from "../config/multer.js"
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  likesPost,
} from "../controllers/post.controller.js"
import authMiddleware from "../middlewares/authentication.middlewares.js"

const postRouter = express.Router()
postRouter.post("/create", authMiddleware, upload.single("img"), createPost)
postRouter.get("/get-posts", authMiddleware, getPosts)
postRouter.get("/get-post/:id", authMiddleware, getPost)
postRouter.delete("/delete/:id", authMiddleware, deletePost)
postRouter.put("/likes/:id", authMiddleware, likesPost)

export default postRouter
