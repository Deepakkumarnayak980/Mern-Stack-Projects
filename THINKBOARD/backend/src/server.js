import express from 'express';
import notesRouter from './router/notesRouter.js';
import { connectionDB } from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

// ✅ MIDDLEWARE FIRST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ ROUTES AFTER
app.use("/api/notes", notesRouter);

// DB connection
connectionDB();

app.listen(PORT, () => {
  console.log(`Server started on PORT : ${PORT}`);
});
