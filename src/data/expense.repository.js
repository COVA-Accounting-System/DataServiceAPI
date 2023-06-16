import { EXPENSE_CATEGORIES } from '../enums/expenseCategories.js'

export default class expenseRepository {
  constructor (Expense) {
    this.Expense = Expense
  }

  async getExpenses (query) {
    return this.Expense.find(query).populate([
      { path: 'creditorEmployee' },
      { path: 'creditorProvider' },
      { path: 'singleOrder' },
      {
        path: 'inventoryInput',
        populate: [{ path: 'listOfMaterials.rawMaterial' }]
      }
    ])
  }

  async getExpense (query) {
    return this.Expense.findOne(query).populate([
      { path: 'creditorEmployee' },
      { path: 'creditorProvider' },
      { path: 'singleOrder' },
      {
        path: 'inventoryInput',
        populate: [{ path: 'listOfMaterials.rawMaterial' }]
      }
    ])
  }

  async getExpenseByIdWithoutPopulate (expensesId) {
    return this.Expense.findOne(expensesId)
  }

  async getLabourExpensesGivenAnOrder (orderId) {
    return this.Expense.find({
      singleOrder: orderId,
      category: EXPENSE_CATEGORIES.LABOUR
    }).populate([{ path: 'creditorEmployee' }])
  }

  async getExpensesGivenAnOrder (orderId) {
    return this.Expense.find({
      'orderList.order': orderId,
      category: EXPENSE_CATEGORIES.INDIRECT_COSTS
    })
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
    return this.Expense.findOneAndDelete(query)
  }

  async getExpensesByDate (startDate, endDate, userId) {
    return this.Expense.find({
      date: {
        $gte: startDate,
        $lte: endDate
      },
      isVisible: true,
      userId
    })
  }
}
