const ChatModel = require('../models/ChatModel');
const UserModel = require('../models/UserModel.js');

async function openChat(req,res){
    const {participants} = req.body;

    try{
        const chat = new ChatModel({
            participants
        });

        await chat.save();
        return ('A new chat has been opened!');

    }catch(err){
        return ('Could not resolve the requested rosource..');
    }
}

async function getUserChats(req,res){
    const user = await UserModel.findOne({username: req.params.username});
    console.log(user);
    if(!user){
        return ('User Not Found!');
    }

    try{
        const chats = await ChatModel.find({participants: user._id})
                        .populate('participants', 'username')
                        .populate('lastMessage');

        return (chats);
    }catch(err){
        return (err);
    }
}


module.exports = {
    openChat,
    getUserChats
}