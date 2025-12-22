import express from 'express';
import notesRouter from './router/notesRouter.js'

const app= express();

app.use("/api/notes",notesRouter)


app.listen(5001,()=>{
    console.log(`Servers started on PORT : 5001`);
    
})

