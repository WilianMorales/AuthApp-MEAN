const express = require('express')
const cors = require('cors')
const DBConfig = require('../db/db.config')
require('colors')
require('dotenv').config()

const db = new DBConfig()

class Server {
    constructor() {
        this.app = express()
        this.PORT = process.env.PORT
        this.path = {
            auth: '/api/auth',
            employees: '/api/employees'
        }
        this.connectDB()
        this.middlewares()
        this.routes()
    }

    //Connection DB
    connectDB = async () => {
        await db.dbConnection()
    }

    // Rutas
    routes = () => {
        this.app.use(this.path.auth, require('../routes/auth.routes'));
        this.app.use(this.path.employees, require('../routes/employee.routes'));
        this.app.use(express.json())
    }

    // CORS | Lectura y parseo del body | Directorio Público
    middlewares = () => {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }

    listen = () => {
        this.app.listen(this.PORT, () => {
            console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`.green)
            console.log(`Modo desarrollo: http://localhost:${this.PORT}`.italic.blue)
        })
    }
}

module.exports = Server
