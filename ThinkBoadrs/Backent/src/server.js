import express from 'express'
import { router } from './router/notes.router.js'
import   'dotenv/config';
import { connectDB } from './config/db.js';

const app =express()
const PORT=process.env.PORT || 8001

app.use(express.json());
app.use('/auth/',router)


connectDB()

app.listen(PORT,()=> {
    console.log(`Server is running PORT:${PORT}`);
    
})

