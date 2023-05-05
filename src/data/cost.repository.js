export default class CostRepository {
  constructor (cost) {
    this.cost = cost
  }

  async getCostReport (query) {
    return this.cost.findOne(query)
  }

  async createCostReport (newCostReport) {
    return newCostReport.save()
  }

  async updateCostReport (id, newCostReport) {
    console.log('editar')
    return this.cost.findOneAndUpdate(
      id,
      {
        startDate: newCostReport.startDate,
        endDate: newCostReport.endDate,
        $set: { expenses: newCostReport.expenses }
      },
      { new: true }
    )
  }
}
