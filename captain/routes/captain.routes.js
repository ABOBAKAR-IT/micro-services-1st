import express from 'express'
const router = express.Router();
import {register,login,logout,profile,toggleAvailability} from '../controllers/captain.controller.js'
import captainAuth from '../middleware/authMiddleWare.js'


router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/profile', captainAuth, profile);
router.patch('/toggle-availability', captainAuth, toggleAvailability);

export default router;