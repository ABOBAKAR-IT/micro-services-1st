import captainModel from '../models/captain.model.js'
import blacklisttokenModel from '../models/blacklisttoken.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const captain = await captainModel.findOne({ email });
        if (captain) {
            return res.status(400).json({ message: 'captain already exists' });
        }
        const hash = await bcrypt.hash(password, 10);
        const newCaptain = new captainModel({ name, email, password: hash });
        await newCaptain.save();
        const token = jwt.sign({ id: newCaptain._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token);
        delete newCaptain._doc.password
        res.send({ success:"true",data:{newCaptain,token},message: 'captain registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const captain = await captainModel
            .findOne({ email })
            .select('+password');
        if (!captain) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, captain.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: captain._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token);
        res.send({success:"true",data:{captain,token}, message: 'captain logged in successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const logout = async (req, res) => {
    try {
        const token = req.cookies.token;
        await blacklisttokenModel.create({ token });
        res.clearCookie('token');
        res.send({ message: 'captain logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const profile = async (req, res) => {
    try {
        res.send(req.captain);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}