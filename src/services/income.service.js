import { Income } from '../models/income.model.js'
import _incomeRepository from '../data/income.repository.js'
import { Order } from '../models/order.model.js'
import _orderRepository from '../data/order.repository.js'

export default class incomeService {
  constructor () {
    this.incomeRepository = new _incomeRepository(Income)
    this.orderRepository = new _orderRepository(Order)
  }

  async createIncome (data) {
    const newIncome = new Income({
      ...data.body,
      userId: data.userId
    })
    return this.incomeRepository.createIncome(newIncome)
  }

  async createIncomeAndRegisterInOrder (data) {
    const newIncome = new Income({
      ...data.body,
      userId: data.userId
    })
    const income = await this.incomeRepository.createIncome(newIncome)
    await this.orderRepository.addToListOfIncomes(data.body.order, income)
    return income
  }

  async deleteAndRemoveFromOrder (data) {
    const income = await this.incomeRepository.deleteIncome({ _id: data.body._id })
    await this.orderRepository.removeFromListOfIncomes(data.body.order, income)
    return income
  }

  async getIncomes (data) {
    const query = { userId: data.userId, isVisible: true }
    return this.incomeRepository.getIncomes(query)
  }

  async getIncome (query) {
    return this.incomeRepository.getIncome(query)
  }

  async updateIncomeVisibility (data) {
    const query = { _id: data.body._id }
    const queryToUpdateWith = { isVisible: false }
    return this.incomeRepository.updateIncome(query, queryToUpdateWith)
  }

  async updateIncome (data) {
    const { _id, ...queryToUpdateWith } = data.body
    const query = { _id }
    return this.incomeRepository.updateIncome(query, queryToUpdateWith)
  }
}
