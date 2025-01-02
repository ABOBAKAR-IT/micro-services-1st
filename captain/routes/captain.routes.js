import express from 'express'
const router = express.Router();
import {register,login,logout,profile} from '../controllers/captain.controller.js'
import userAuth from '../middleware/authMiddleWare.js'


router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/profile', userAuth, profile);

export default router;