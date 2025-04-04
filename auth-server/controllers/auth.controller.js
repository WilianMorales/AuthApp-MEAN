const { response } = require('express');
const bcrypt = require('bcryptjs');
const { User }  = require('../models');
const { generateJWT } = require('../helpers')
const { UserDTO } = require('../dtos');

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
        const userDTO = new UserDTO(dbUser);
        // Generar respuest exitosa
        return res.status(201).json({
            ok: true,
            msg: 'Usuario registrado correctamente',
            user: userDTO,
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
        const userDTO = new UserDTO(dbUser);

        // Generar respuest exitosa
        return res.json({
            ok: true,
            user: userDTO,
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
    const { uid } = req.user;
    
    try {
        const dbUser = await User.findById(uid);

        if (!dbUser) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }

        // Generar el nuevo token
        const newToken = await generateJWT(uid, dbUser.name);

        // Crear un objeto UserDTO con la información del usuario
        const userDTO = new UserDTO(dbUser);

        return res.json({
            ok: true,
            msg: 'Token renovado correctamente',
            user: userDTO,
            newToken
        });
    }catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado al renovar el token'
        });
    }
   
};

module.exports = { 
    addUser,
    loginUser,
    revalidateJWToken
}
