import rideModel from '../models/ride.model.js'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {publishToQueue} from '../service/rabbit.js'
export const createRide = async (req, res,next) => {
    try {
       const {pickup,destination}=req.body;
       const newRide= new rideModel({
        user:req.user._id,
        pickup,
        destination
       })
           await newRide.save();
       publishToQueue("new-ride",JSON.stringify(newRide))
       res.send(newRide)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}
