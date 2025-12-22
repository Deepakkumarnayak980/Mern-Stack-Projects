import express from 'express';
import notesRouter from './router/notesRouter.js'
import { connectionDB } from './config/db.js';
import dotenv from 'dotenv'


dotenv.config()

const app= express();
const PORT =process.env.PORT || 5002

app.use("/api/notes",notesRouter)

connectionDB()

app.listen(5001,()=>{
    console.log(`Servers started on PORT : ${PORT}`);
    
})

