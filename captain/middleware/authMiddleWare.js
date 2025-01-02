import jwt from 'jsonwebtoken'
import captainModel from '../models/captain.model.js'
const captainAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded.id);
        if (!captain) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.captain = captain;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default captainAuth