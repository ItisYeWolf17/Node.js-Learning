const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');

async function register(req, res){
    let user = req.body;
    try{
        const password = await hashPassword(user.password);
        user.password = password;
        const answer = await UserModel.create(user);
        return (answer);
    }catch(err){
        return err
    }

}

async function listUsers(req, res){
    const answer = await UserModel.find({});
    return answer;
}

async function login(req,res){
    const {username, password} = req.body;

    const user = await UserModel.findOne({username});

    if(!user){
        return ('Usuario no encontrado');
    }

    console.log('usuario existente');

    if(await checkPassword(user, password)){
        user.status = 'online';
        await user.save();
        return {message: 'Login Succesful!'};
    }else

    return {message: 'Login Failed!'};

}

async function logout(req,res){
    const username = req.body.username;

    const user = await UserModel.findOne({username});
    console.log(user);

    if(!user){
        return {message: 'Logout Failed!'};
    }
    
    user.status = 'offline'
    await user.save();
    return {message: 'Logout Succesful!'};

}

async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        return hashed;
    } catch (err) {
        throw new Error(err);
    }
}

async function checkPassword(user, password){
    if(await bcrypt.compare(password, user.password)){
        return (true)
    }else{
        return (false)
    }
}



module.exports = {
    register,
    listUsers,
    login,
    logout
}
