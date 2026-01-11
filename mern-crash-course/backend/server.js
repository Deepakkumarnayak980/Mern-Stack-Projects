import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import productRouter from "./router/product.router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ===== FIX __dirname FOR ES MODULES ===== */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ===== MIDDLEWARE ===== */
app.use(express.json());

/* ===== API ROUTES ===== */
app.use("/api/product", productRouter);

/* ===== PRODUCTION FRONTEND ===== */
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");

  app.use(express.static(frontendPath));

  // ✅ Express 5 compatible catch-all route
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

/* ===== START SERVER ===== */
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});
