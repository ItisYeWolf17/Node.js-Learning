const express = require ('express');
const dbconnect = require('./config.');
const UserModel = require('./userModel');
const app = express();
const router = express.Router();

router.get("/", (req, res) => {
    res.send('Ventana Principal')
})

router.get("/users", (req, res) => {
    res.send('Hola, soy controlador de usuarios')
})

router.get("/users/list", async (req, res) => {
    const answer = await UserModel.find({})
    res.send(answer)
})

router.get("/users/search/:id", async (req, res) => {
    const id = req.params.id;
    const answer = await UserModel.findById(id)
    res.send(answer)
})

router.post("/users/create", async (req, res) => {
    const body = req.body;
    const answer = await UserModel.create(body);
    res.send(answer)
})

router.put("/users/update/:id", async (req,res) => {
    const body = req.body;
    const id = req.params.id;
    const answer = await UserModel.findOneAndUpdate({_id: id}, body);
    res.send(answer)
})

router.delete("/users/delete/:id", async (req,res) => {
    const id = req.params.id;
    const answer = await UserModel.deleteOne({_id: id});
    res.send(answer)
})

app.use(express.json());
app.use(router);
app.listen(3001, () => {
    console.log('El servidor se encuentra en localhost:3001');
})

dbconnect();
