import _expenseRepository from '../data/expense.repository.js'
import { Expense } from '../models/expense.model.js'

import _inventoryInputRepository from '../data/inventoryInput.repository.js'
import { InventoryInput } from '../models/inventoryInput.model.js'

export default class expenseService {
  constructor () {
    this.expenseRepository = new _expenseRepository(Expense)
    this.inventoryInputRepository = new _inventoryInputRepository(
      InventoryInput
    )
  }

  async getExpenses (data) {
    const query = { userId: data.userId, isVisible: true }
    return this.expenseRepository.getExpenses(query)
  }

  async createExpense (data) {
    const newExpense = new Expense({
      ...data.body,
      userId: data.userId
    })
    return this.expenseRepository.createExpense(newExpense)
  }

  async createExpenseOfInventoryInput (data) {
    const newInventoryInput = new InventoryInput({
      ...data.body.inventoryData,
      userId: data.userId
    })
    const inventoryInput =
      await this.inventoryInputRepository.createInventoryInput(
        newInventoryInput
      )
    const newExpense = new Expense({
      ...data.body.expenseData,
      userId: data.userId,
      inventoryInput: inventoryInput._id
    })
    const expense = await this.expenseRepository.createExpense(newExpense)
    return {
      expense,
      inventoryInput
    }
  }

  async updateExpenseVisibility (data) {
    const query = { _id: data.body._id }
    const queryToUpdateWith = { isVisible: false }
    return this.expenseRepository.updateExpense(query, queryToUpdateWith)
  }

  async updateExpense (data) {
    const { _id, ...queryToUpdateWith } = data.body
    const query = { _id }
    return this.expenseRepository.updateExpense(query, queryToUpdateWith)
  }

  async deleteExpense (data) {
    const query = data.body
    return this.expenseRepository.deleteExpense(query)
  }
}
