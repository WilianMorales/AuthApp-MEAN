const authController = require('./auth.controller');
const employeeController = require('./employee.controller');

module.exports = {
    ...authController,
    ...employeeController
}
