import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import exprss from "express";

import connectDB from "./config/connectDB.js";
import authRouter from "./routes/auth.routes.js";
import postRouter from "./routes/post.routes.js";
import userRouter from "./routes/user.routes.js";

const app = exprss();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(exprss.json());
app.use(cookieParser());
app.use(exprss.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
