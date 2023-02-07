import _employeeRepository from '../data/employee.repository.js'
import { Employee } from '../models/employee.model.js'

export default class employeeService {
  constructor () {
    this.employeeRepository = new _employeeRepository(Employee)
  }

  async getEmployees (data) {
    const query = { userId: data.userId, isVisible: true }
    return this.employeeRepository.getEmployees(query)
  }

  async createEmployee (data) {
    const newEmployee = new Employee({
      ...data.body,
      userId: data.userId
    })
    return this.employeeRepository.createEmployee(newEmployee)
  }

  async updateEmployeeVisibility (data) {
    const query = { _id: data.body._id }
    const queryToUpdateWith = { isVisible: false }
    return this.employeeRepository.updateEmployee(query, queryToUpdateWith)
  }

  async updateEmployee (data) {
    const { _id, ...queryToUpdateWith } = data.body
    const query = { _id }
    return this.employeeRepository.updateEmployee(query, queryToUpdateWith)
  }

  async deleteEmployee (data) {
    const query = data.body
    return this.employeeRepository.deleteEmployee(query)
  }
}
