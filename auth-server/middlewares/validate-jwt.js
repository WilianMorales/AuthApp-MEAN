require('dotenv').config();
const { response } = require("express")
const jwt = require('jsonwebtoken');

const validateJWToken = ( req, res = response, next) => {

    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Se requiere ingresar un token'
        });
    }

    try {
        const { uid, name } = jwt.verify( token, process.env.SECRET_KEY_JWT)
        req.uid = uid;
        req.name = name;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'El token ingresado no es válido'
        });
    }
    next();
}

module.exports = {
    validateJWToken
}
