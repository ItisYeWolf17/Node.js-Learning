const express = require('express');
const dbconnect = require('./config');
const userCtr = require('./controllers/UserController');
const chatCtr = require('./controllers/ChatController');
const app = express();
const router = express.Router();

//UserController
router.post("/user/signUp", async(req,res) => {
    const answer = await userCtr.register(req,res);
    res.send(answer);
})

router.get("/user/listUsers", async(req,res) => {
    const answer = await userCtr.listUsers(req,res);
    res.send(answer);
})

router.post("/user/login", async(req, res) => {
    const answer = await userCtr.login(req,res);
    res.send(answer);
})

router.post("/user/logout", async(req, res) => {
    const answer = await userCtr.logout(req,res);
    res.send(answer);
})

//ChatController

router.post("/chat/newChat", async(req,res) => {
    const answer = await chatCtr.openChat(req,res);
    res.send(answer);
});

router.get("/chat/getChats/:username", async(req, res) => {
    const answer = await chatCtr.getUserChats(req,res);
    res.send (answer);
})


app.use(express.json());
app.use(router);
app.listen(3000, () => {
    console.log('El servidor se encuentra en localhost:3000');
})

dbconnect();