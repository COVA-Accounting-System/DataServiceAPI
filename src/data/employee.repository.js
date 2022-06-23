

export default class employeeRepository{
   constructor(Employee){
        this.Employee = Employee;
   }
    async getEmployees(){
        return this.Employee.find();
    }

    async createEmployee(newEmployee){
        return newEmployee.save();
    }
}