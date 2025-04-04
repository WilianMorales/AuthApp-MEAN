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
        req.user = { uid, name };
    } catch (error) {
        console.error(error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                ok: false,
                msg: 'El token ha expirado'
            });
        }
        return res.status(401).json({
            ok: false,
            msg: 'El token no es válido o ha sido manipulado'
        });
    }
    next();
}

module.exports = {
    validateJWToken
}
