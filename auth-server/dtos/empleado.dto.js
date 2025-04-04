class EmployeeDTO {
    constructor(employee) {
        this.name = employee.name;
        this.lastName = employee.lastName;
        this.email = employee.email;
        this.age = employee.age;
        this.address = employee.address;
        this.position = employee.position;
        this.salary = employee.salary;
    }
}

module.exports = EmployeeDTO;