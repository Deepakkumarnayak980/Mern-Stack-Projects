import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from 'path'

import { app, server } from "../src/lib/socket.js";
import authRoute from "./router/auth.routes.js";
import messageRouter from "./router/message.router.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

// Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRouter);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../../frontend/dist")))

  app.get("*",(req,res) => {
    res.sendFile(path.join(__dirname,"../../frontend","dist","index.html"))
  })
}

const PORT = process.env.PORT || 5001;

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
