const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    recipent: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        sent: {
            type: Date, 
            default: Date.now
        },
        delivered: Date,
        read: Date
    },
    attachment: {
        type: String
    }
},{
    timestamps: true,
    versionKey: false
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;