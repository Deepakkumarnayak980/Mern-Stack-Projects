import express from "express"

import authRoute from "../src/router/auth.routes.js"

const app=express()

app.use("/api/auth",authRoute)

app.listen(5001,() => {
    console.log("server is rinning on port 5001");
    
})
