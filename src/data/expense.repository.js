export default class employeeRepository {
  constructor (Expense) {
    this.Expense = Expense
  }

  async getExpenses (query) {
    return this.Expense.find(query).populate([
      { path: 'creditorEmployee' },
      { path: 'creditorProvider' },
      { path: 'inventoryInput' }
    ])
  }

  async getExpense (query) {
    return this.Expense.findOne(query).populate([
      { path: 'creditorEmployee' },
      { path: 'creditorProvider' },
      { path: 'inventoryInput' }
    ])
  }

  async createExpense (newExpense) {
    const expense = await newExpense.save()
    return this.getExpense({ _id: expense._id })
  }

  async updateExpense (query, queryToUpdateWith) {
    await this.Expense.findOneAndUpdate(query, queryToUpdateWith)
    return this.getExpense(query)
  }

  async deleteExpense (query) {
    await this.Expense.findOneAndDelete(query)
    return 'This expense was deleted'
  }
}
