import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import dbconnect from './db/db.js'
dbconnect()
import userRoutes  from './routes/user.routes.js'
import cookieParser  from 'cookie-parser'
const app =express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/', userRoutes)


export default app