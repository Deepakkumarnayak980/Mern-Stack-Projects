import "dotenv/config";
import express from "express";
import cors from "cors";
import notesRouter from "./router/notesRouter.js";
import { connectionDB } from "./config/db.js";
import ratelimiter from "./middleWare/rateLimiter.js";

const app = express();
const PORT = process.env.PORT || 5002;

// ✅ BODY PARSERS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS FIRST
app.use(
  cors({
    origin: "http://localhost:5173", // Vite frontend
    credentials: true,
  })
);



// ✅ RATE LIMITER
app.use(ratelimiter);

// ✅ ROUTES
app.use("/api/notes", notesRouter);

// ✅ DB + SERVER
connectionDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server started on PORT : ${PORT}`);
  });
});
