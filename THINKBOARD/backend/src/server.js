import "dotenv/config";
import express from "express";
import notesRouter from "./router/notesRouter.js";
import { connectionDB } from "./config/db.js";
import ratelimiter from "./middleWare/rateLimiter.js";

const app = express();
const PORT = process.env.PORT || 5002;

// ✅ MIDDLEWARE FIRST
app.use(express.json()); // this middleware will parse JSON bodies : req.body
app.use(express.urlencoded({ extended: true }));

app.use(ratelimiter);

// our simple custom middleware
// app.use((req,res,next) => {
//     console.log(`req method is ${req.method} and Req url is ${req.url}`);
//     next()

// })

// ✅ ROUTES AFTER
app.use("/api/notes", notesRouter);

// DB connection
connectionDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on PORT : ${PORT}`);
  });
});
