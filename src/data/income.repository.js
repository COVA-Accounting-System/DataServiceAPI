export default class incomeRepository {
  constructor (Income) {
    this.Income = Income
  }

  async getIncome (query) {
    return this.Income.findOne(query)
  }

  async getIncomes (query) {
    return this.Income.find(query)
  }

  async createIncomes (newIncome) {
    return newIncome.save()
  }

  async updateIncome (query, queryToUpdateWith) {
    await this.Income.findOneAndUpdate(query, queryToUpdateWith)
    return this.getIncome(query)
  }
}
