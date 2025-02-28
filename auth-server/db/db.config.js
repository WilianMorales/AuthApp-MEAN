require('dotenv').config()
require('colors')

const mongoose = require('mongoose')

class DBConfig {
    constructor() {
        this.MONGODB_CNN = process.env.DB_CNN
    }
    dbConnection = async() => {
        try {
            await mongoose.connect( this.MONGODB_CNN, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log(`DB Online`.green)
        } catch (error) {
            console.log(`Error en la conexión a la BD:`.red);
            throw new Error(error)
        }
    }
}

module.exports = DBConfig;
