import mongoose from 'mongoose'
const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600 // 1 hour in seconds
    }
}, {
    timestamps: true
})
const blacklisttoken = mongoose.model('blacklisttoken', blacklistTokenSchema);

export default blacklisttoken