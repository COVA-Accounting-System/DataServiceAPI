export default class employeeRepository {
  constructor(Employee) {
    this.Employee = Employee;
  }
  async getEmployees(query) {
    return this.Employee.find(query);
  }

  async createEmployee(newEmployee) {
    return newEmployee.save();
  }

  async getEmployee(query) {
    return this.Employee.findOne(query);
  }

  async updateEmployee(query, queryToUpdateWith) {
    await this.Employee.findOneAndUpdate(query, queryToUpdateWith);
    return this.getEmployee(query);
  }

  async deleteEmployee(query) {
    await this.Employee.findOneAndDelete(query);
    return `This employee was deleted`;
  }
}
