export default class incomeRepository {
  constructor (Income) {
    this.Income = Income
  }

  async getIncome (query) {
    return this.Income.findOne(query).populate([
      { path: 'client' },
      {
        path: 'order',
        populate: [{ path: 'orderProduct' }, { path: 'orderClient' }]
      }
    ])
  }

  async getIncomes (query) {
    return this.Income.find(query).populate([
      { path: 'client' },
      {
        path: 'order',
        populate: [{ path: 'orderProduct' }, { path: 'orderClient' }]
      }
    ])
  }

  async createIncome (newIncome) {
    const income = await newIncome.save()
    console.log(income._id)
    return this.getIncome({ _id: income._id })
  }

  async updateIncome (query, queryToUpdateWith) {
    await this.Income.findOneAndUpdate(query, queryToUpdateWith)
    return this.getIncome(query)
  }
}
