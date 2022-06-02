import _employeeRepository from "../data/employee.repository.js"


export default class employeeService{
    constructor(){
        this.employeeRepository = new _employeeRepository();
    }

    async getEmployees(){
        return this.employeeRepository.getEmployees();
    }

    async createEmployee(data){
        return this.employeeRepository.createEmployee(data);
    }
}