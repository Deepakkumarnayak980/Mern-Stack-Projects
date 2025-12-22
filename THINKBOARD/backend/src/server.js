import express from 'express';
import notesRouter from './router/notesRouter.js'
import { connectionDB } from './config/db.js';

const app= express();

app.use("/api/notes",notesRouter)

connectionDB()

app.listen(5001,()=>{
    console.log(`Servers started on PORT : 5001`);
    
})

