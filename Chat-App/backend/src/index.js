import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoute from "./router/auth.routes.js";
import messageRouter from "./router/message.router.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";

dotenv.config();

const app = express();

// ✅ FIX HERE (THIS SOLVES YOUR ERROR)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use("/api/auth", authRoute);
app.use("/api/message", messageRouter);

const PORT = process.env.PORT || 5001;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });
