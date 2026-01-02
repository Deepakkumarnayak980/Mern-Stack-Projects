import "dotenv/config";
import express from "express";
import cors from "cors";
import notesRouter from "./router/notesRouter.js";
import { connectionDB } from "./config/db.js";
import ratelimiter from "./middleWare/rateLimiter.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5002;

// ✅ FIX __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ BODY PARSERS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ✅ RATE LIMITER
app.use(ratelimiter);

// ✅ API ROUTES
app.use("/api/notes", notesRouter);

// ✅ SERVE FRONTEND IN PRODUCTION
if (process.env.NODE_ENV === "production") {
  app.use(
    express.static(
      path.join(__dirname, "../../frontend/dist")
    )
  );

  app.get(/.*/, (req, res) => {
    res.sendFile(
      path.join(
        __dirname,
        "../../frontend/dist/index.html"
      )
    );
  });
}


// ✅ DB + SERVER
connectionDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server started on PORT : ${PORT}`);
  });
});
