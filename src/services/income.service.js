
import { Income } from '../models/income.model.js'
import _incomeRepository from '../data/income.repository.js'

export default class incomeService {
  constructor () {
    this.incomeRepository = new _incomeRepository(Income)
  }

  async createIncome (data) {
    const newIncome = new Income({
      ...data.body,
      userId: data.userId
    })
    return this.incomeRepository.createIncomes(newIncome)
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
