const { Employee } = require('../models');

const createEmployee = async (req, res) => {
    const { name, lastName, email, age, address, position, salary } = req.body;
    try {
        const newEmployee = new Employee({
            name,
            lastName,
            email,
            age,
            address,
            position,
            salary
        });

        await newEmployee.save();

        return res.status(201).json({
            ok: true,
            msg: 'Empleado creado correctamente',
            employee: newEmployee
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al crear el empleado. Por favor, intente nuevamente.',
        });
    }
};

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        return res.json({
            ok: true,
            employees
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al obtener los empleados',
        });
    }
};

// Buscar empleado por nombre
const getEmployeeByName = async (req, res) => {
    const { name, lastName } = req.query;

    try {
        // Buscar un empleado que coincida con el nombre
        //const employee = await Employee.findOne({ name });

        let query = {}
        if (name) {
            query.name = name;
        }
        if (lastName) {
            query.lastName = lastName;
        }
        const employees = await Employee.find(query);

        if (employees.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'Empleado(s) no encontrado'
            });
        }

        return res.json({
            ok: true,
            employee
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al buscar al empleado'
        });
    }
};

const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { name, lastName, email, age, address, salary } = req.body;

    try {
        const employee = await Employee.finById(id);
        if (!employee) {
            return res.status(404).json({
                ok: false,
                msg: 'Empleado no encontrado',
            });
        }

        employee.name = name || employee.name;
        employee.lastName = lastName || employee.lastName;
        employee.email = email || employee.email;
        employee.age = age || employee.age;
        employee.address = address || employee.address;
        employee.salary = salary || employee.salary;

        await employee.save();

        return res.json({
            ok: true,
            employee
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el empleado',
        });
    }
};

const deleteEmployee = async (req, res) => {
    const { id } = req.params;

    try {
        const employee = await Employee.finById(id);
        if (!employee) {
            return res.status(404).json({
                ok: false,
                msg: 'Empleado no encontrado',
            });
        }

        await employee.delete();

        return res.json({
            ok: true,
            msg: 'Empleado eliminado',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al eliminar el empleado',
        });
    }
};

module.exports = {
    createEmployee,
    getEmployees,
    getEmployeeByName,
    updateEmployee,
    deleteEmployee,
}