import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import dbconnect from './db/db.js'
dbconnect()
import rideRoutes  from './routes/ride.routes.js'
import cookieParser  from 'cookie-parser'
import {connect} from './service/rabbit.js'
const app =express()
connect()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/', rideRoutes)


export default app