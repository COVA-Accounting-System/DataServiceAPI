import {Employee} from "../models/employee.model.js"

export default class employeeRepository{
   
    async getEmployees(){
        return Employee.find();
    }

    async createEmployee(data){
        const newEmployee = new Employee({
            name: data.body.name,
            lastName: data.body.lastName,
            phone: data.body.phone,
            ci: data.body.phone,
            salary: data.body.salary
        });
        return newEmployee.save();
    }
}