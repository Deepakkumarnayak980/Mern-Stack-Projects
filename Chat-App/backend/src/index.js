import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoute from "./router/auth.routes.js";
import messageRouter from "./router/message.router.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/message", messageRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server is running on port: ${PORT}`);
  await connectDB();
});
