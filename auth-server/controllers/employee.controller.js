const { Employee } = require('../models');
const { EmployeeDTO } = require('../dtos');

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

        const employeeDTO = EmployeeDTO(newEmployee);

        return res.status(201).json({
            ok: true,
            msg: 'Empleado creado correctamente',
            employee: employeeDTO
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
        const employeeDTOs = employees.map(employee => new EmployeeDTO(employee));

        return res.json({
            ok: true,
            employees: employeeDTOs
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al obtener los empleados',
        });
    }
};

// Buscar empleado por nombres
const getEmployeeByNames = async (req, res) => {
    const { name, lastName } = req.query;

    try {
        if (!name && !lastName) {
            return res.status(400).json({
                ok: false,
                msg: 'Se requiere al menos uno de los parámetros: nombre o apellido',
            });
        }

        let query = {};
        if (name) query.name = { $regex: name, $options: 'i' };
        if (lastName) query.lastName = { $regex: lastName, $options: 'i' };

        const employees = await Employee.find(query);

        // Si no se encuentran empleados
        if (employees.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'Empleado(s) no encontrado(s)',
            });
        }

        const employeeDTOs = employees.map(employee => new EmployeeDTO(employee));

        return res.json({
            ok: true,
            employee: employeeDTOs
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
    const { name, lastName, email, age, address, position, salary } = req.body;

    try {
        const employee = await Employee.findById(id);
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
        employee.position = position || employee.position;
        employee.salary = salary || employee.salary;

        await employee.save();

        const employeeDTO = EmployeeDTO(employee);

        return res.json({
            ok: true,
            employee: employeeDTO
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
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({
                ok: false,
                msg: 'Empleado no encontrado',
            });
        }

        const employeeDTO = new EmployeeDTO(employee);

        await employee.delete();

        return res.json({
            ok: true,
            msg: 'Empleado eliminado',
            employee: employeeDTO
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
    getEmployeeByNames,
    updateEmployee,
    deleteEmployee,
}