import jwt from 'jsonwebtoken'
import userModel from '../models/ride.model.js'
import axios from 'axios'
const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await axios.get(`${process.env.BASE_URL}/user/profile`,{headers:{
            Authorization: `Bearer ${token}`
        }})
        
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default userAuth