import mongoose from 'mongoose'
const captainSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    isAvailable:{
        type:Boolean,
        default:false
    }

})
const captain= mongoose.model('captain', captainSchema);

export default captain