import rideModel from '../models/ride.model.js'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const createRide = async (req, res,next) => {
    try {
       const {pickup,destination}=req.body;
       const newRide= new rideModel({
        user:req.user._id,
        pickup,
        destination
       })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
