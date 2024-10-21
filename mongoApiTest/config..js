const mongoose = require('mongoose');
const dbconnect = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect("mongodb://localhost:27017/users_prueba");
        console.log('Conexión Correcta');
    } catch (error) {
        console.error('Error de Conexión:', error);
    }
};

module.exports = dbconnect;