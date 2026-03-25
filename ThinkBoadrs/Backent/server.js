import express from 'express'

const app =express()
const PORT=process.env.PORT || 8000

app.get('/',(req,res)=>{
    res.status(200).send("you got 20 notes")
})


app.post('/api/note',(req,res)=>{
    res.status(200).send("you got 20 notes")
})




app.listen(PORT,()=> {
    console.log(`Server is running PORT:${PORT}`);
    
})

