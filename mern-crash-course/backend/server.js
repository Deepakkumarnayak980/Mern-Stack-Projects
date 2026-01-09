import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import productRouter from "./router/product.router.js"

dotenv.config();

const app = express();
const PORT =process.env.PORT || 5000
app.use(express.json());




app.use("/api/product",productRouter)

/* ================= SERVER ================= */
app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:",PORT);
});
