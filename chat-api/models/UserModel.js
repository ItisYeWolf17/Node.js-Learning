const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    friends: [
        {
            type: mongoose.Types.ObjectId, ref: 'User'
        }
    ],
    friendRequests: [
        {
            type:  mongoose.Types.ObjectId, ref: 'User'
        }
    ],
    sentFriendRequests: [
        {
            type: mongoose.Types.ObjectId, ref: 'User'
        }
    ],
    status: {
        type: String,
        enum: ['online', 'offline', 'iddle'], 
        default: 'offline'
    }
},{
    timestamps: true,
    versionKey: false
}
);

const User = mongoose.model("User", userSchema);
module.exports = User;