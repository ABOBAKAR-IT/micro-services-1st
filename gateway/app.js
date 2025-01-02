import express from 'express'

import expressProxy from 'express-http-proxy'

const app=express()


app.use('/user',expressProxy("http://127.0.0.1:3001"))

app.use('/captain',expressProxy("http://127.0.0.1:3002"))



app.listen(3000,()=>{
    console.log("Gateway server is running on port 3000")
})