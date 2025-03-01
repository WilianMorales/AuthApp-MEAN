const { response } = require('express');
const bcrypt = require('bcryptjs');
const { User }  = require('../models');
const { generateJWT } = require('../helpers')

const addUser = async(req, res = response) => {

    const { email, name, password } = req.body;

    try {
        // Verificar el email
        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return res.status(400).json({
                ok: false,
                msg: `El correo ${email} ya está registrado`
            });
        }
        // Crear usuario en el modelo
        const dbUser = new User({ email, name, password });
        // Hashear la contraseña
        const salt = bcrypt.genSaltSync(10);
        dbUser.password = bcrypt.hashSync(password, salt);
        // Generar el JWToken
        const token = await generateJWT( dbUser.id, name);
        // Crear usuario de DB
        await dbUser.save();
        // Generar respuest exitosa
        return res.status(201).json({
            ok: true,
            msg: 'Usuario registrado correctamente',
            uid: dbUser.id,
            name,
            email,
            token
        })
    } catch (error) {
        console.log(`Error: `.red, error)
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado. Por favor contacté con el administrador'
        });
    }
}

const loginUser = async(req, res = response) => {

    const { email, password } = req.body;

    try{
        // Verificar si el email existe
        const dbUser = await User.findOne({ email });
        if (!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario / contraseña no válidos'
            });
        }
        // Verificar si la contraseña es correcta
        const validPassword = bcrypt.compareSync(password, dbUser.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario / contraseña no válidos'
            });
        }
        // Generar el JWToken
        const token = await generateJWT( dbUser.id, dbUser.name);
        // Generar respuest exitosa
        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            token
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado. Por favor contacté con el administrador'
        });
    }
}

const revalidateJWToken = async(req, res = response) => {
    const { uid } = req;

    const dbUser = await User.findById(uid);

    const newToken = await generateJWT(uid, dbUser.name)
    return res.json({
        ok: true,
        msg: 'Token renovado correctamente',
        uid,
        name: dbUser.name,
        email: dbUser.email,
        newToken
    });
}

module.exports = { 
    addUser,
    loginUser,
    revalidateJWToken
}
