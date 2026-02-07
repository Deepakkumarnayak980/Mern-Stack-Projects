import express from "express"
import dotenv from "dotenv"
import authRoute from "../src/router/auth.routes.js"
import { connectDB } from "./lib/db.js"

dotenv.config()

const app = express()

// middleware to read JSON body
app.use(express.json())

// routes
app.use("/api/auth", authRoute)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port :${PORT}`)
  connectDB()
})
  