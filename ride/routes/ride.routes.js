import express from 'express'
const router = express.Router();
import {createRide} from '../controllers/ride.controller.js'
import userAuth from '../middleware/authMiddleWare.js'


router.post('/create-ride', userAuth,createRide);


export default router;