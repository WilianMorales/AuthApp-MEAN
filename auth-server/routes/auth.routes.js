const { Router } = require('express');
const { check } = require('express-validator');
const { addUser, revalidateJWToken, loginUser } = require('../controllers');
const { validateFields, validateJWToken } = require('../middlewares');

const router = Router();

// Crear un nuevo usuario
router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email debe tener un formato correcto').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener un mínimo de 6 caracteres').isLength({ min: 6 }),
    validateFields
], addUser);

// Login de usuario
router.post('/login', [
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email debe tener un formato correcto').isEmail(),
    check('password', 'El password debe tener un mínimo de 6 caracteres').isLength({ min: 6 }),
    validateFields
] , loginUser);

// Validar y revalidar tokeb
router.get('/renew', validateJWToken, revalidateJWToken);

module.exports = router;
