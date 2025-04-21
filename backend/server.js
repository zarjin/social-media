import cookieParser from "cookie-parser"
import cors from "cors"
import "dotenv/config"
import exprss from "express"

import connectDB from "./config/connectDB.js"

const app = exprss()
const PORT = process.env.PORT || 5000

connectDB()

app.use(cors())
app.use(exprss.json())
app.use(cookieParser())
app.use(exprss.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
