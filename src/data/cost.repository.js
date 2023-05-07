export default class CostRepository {
  constructor (cost) {
    this.cost = cost
  }

  async getCostReport (query) {
    return this.cost.findOne(query).populate({
      path: 'expenses',
      populate: {
        path: 'expense',
        model: 'Expense'
      }
    })
  }

  async createCostReport (newCostReport) {
    return newCostReport.save()
  }

  async updateCostReport (id, newCostReport) {
    return this.cost
      .findOneAndUpdate(
        id,
        {
          startDate: newCostReport.startDate,
          endDate: newCostReport.endDate,
          $set: { expenses: newCostReport.expenses }
        },
        { new: true }
      )
      .populate({
        path: 'expenses',
        populate: {
          path: 'expense',
          model: 'Expense'
        }
      })
  }
}
