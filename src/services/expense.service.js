import _expenseRepository from '../data/expense.repository.js'
import { Expense } from '../models/expense.model.js'

import _inventoryInputRepository from '../data/inventoryInput.repository.js'
import { InventoryInput } from '../models/inventoryInput.model.js'

import { Config } from '../models/config.model.js'
import _configRepository from '../data/config.repository.js'

export default class expenseService {
  constructor () {
    this.expenseRepository = new _expenseRepository(Expense)
    this.inventoryInputRepository = new _inventoryInputRepository(
      InventoryInput
    )
    this.configRepository = new _configRepository(Config)
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
    const expense = this.expenseRepository.createExpense(newExpense)
    this.configRepository.updateConfig(
      { userId: data.userId },
      {
        $inc: { expenseNumber: 1 }
      }
    )
    return expense
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
    await this.configRepository.updateConfig(
      { userId: data.userId },
      {
        $inc: { expenseNumber: 1, inventoryInputNumber: 1 }
      }
    )
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

  async updateExpenseAndInventoryInput (data) {
    const inventoryData = data.body.inventoryData
    const expenseData = data.body.expenseData
    const inventoryInput =
      await this.inventoryInputRepository.updateInventoryInput(
        { _id: inventoryData._id },
        inventoryData
      )
    const expense = await this.expenseRepository.updateExpense(
      { _id: expenseData._id },
      expenseData
    )
    return {
      expense,
      inventoryInput
    }
  }

  async deleteExpenseAndInventoryInput (data) {
    const expense = await this.expenseRepository.deleteExpense({
      _id: data.body.expenseData._id
    })
    const inventoryInput =
      await this.inventoryInputRepository.deleteInventoryInput({
        _id: data.body.inventoryData._id
      })
    return {
      expense,
      inventoryInput
    }
  }

  async deleteExpense (data) {
    const query = { _id: data.body._id }
    return this.expenseRepository.deleteExpense(query)
  }
}
