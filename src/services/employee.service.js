import _employeeRepository from "../data/employee.repository.js"
import {Employee} from "../models/employee.model.js"

export default class employeeService{
    constructor(){
        this.employeeRepository = new _employeeRepository(Employee);
    }

    async getEmployees(){
        return this.employeeRepository.getEmployees();
    }

    async createEmployee(data){
        const newEmployee = new Employee({
            name: data.body.name,
            lastName: data.body.lastName,
            ci: data.body.ci,
            nationality: data.body.nationality,
            dateOfBirth: data.body.dateOfBirth,
            phone: data.body.phone,
            startDate: data.body.startDate
        });
        return this.employeeRepository.createEmployee(newEmployee);
    }
}