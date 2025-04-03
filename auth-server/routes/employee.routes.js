const { Router } = require('express');
const { check } = require('express-validator');
const { createEmployee, getEmployees, updateEmployee, deleteEmployee } = require('../controllers');
const { validateFields, validateJWToken } = require('../middlewares');

const router = Router();

// Obtener todos los empleados
router.get('/list', validateJWToken, getEmployees);

// Crear un nuevo empleado
router.post('/create', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('lastName', 'El Apellido es obligatorio').not().isEmpty(),
    check('email', 'El correo electrónico es obligatorio y debe ser válido').isEmail(),
    check('age', 'La edad es obligatoria').not().isEmpty(),
    check('address', 'La dirección es obligatorio').not().isEmpty(),
    check('position', 'El puesto es obligatorio').not().isEmpty(),
    check('salary', 'El salario es obligatorio y debe ser un número').isNumeric(),
    validateFields,
    validateJWToken
], createEmployee);

// Actualizar un empleado
router.put('/update/:id', validateJWToken, updateEmployee);

// Eliminar un empleado
router.delete('/delete/:id', validateJWToken, deleteEmployee);

module.exports = router;