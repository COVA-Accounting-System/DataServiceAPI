import _expenseRepository from '../data/expense.repository.js'
import { Expense } from '../models/expense.model.js'

import _inventoryInputRepository from '../data/inventoryInput.repository.js'
import { InventoryInput } from '../models/inventoryInput.model.js'

import { Order } from '../models/order.model.js'
import _orderRepository from '../data/order.repository.js'

import { Config } from '../models/config.model.js'
import _configRepository from '../data/config.repository.js'

import { EXPENSE_CATEGORIES } from '../enums/expenseCategories.js'
import { ORDER_PRODUCT_AMOUNT } from '../enums/orderProductAmount.js'

export default class expenseService {
  constructor () {
    this.expenseRepository = new _expenseRepository(Expense)
    this.inventoryInputRepository = new _inventoryInputRepository(
      InventoryInput
    )
    this.orderRepository = new _orderRepository(Order)
    this.configRepository = new _configRepository(Config)
  }

  roundToFixed (num) {
    const rounded = Math.round(num * 100) / 100
    return rounded
  }

  calculateIndirectCosts (orders, amount) {
    let totalOfUnits = 0
    orders.map(order => {
      if (order.orderProductAmountType === ORDER_PRODUCT_AMOUNT.UNIT) {
        totalOfUnits = totalOfUnits + order.orderProductAmount
      }
      if (order.orderProductAmountType === ORDER_PRODUCT_AMOUNT.PAIR) {
        totalOfUnits = totalOfUnits + order.orderProductAmount * 2
      }
      if (order.orderProductAmountType === ORDER_PRODUCT_AMOUNT.DOZEN) {
        totalOfUnits = totalOfUnits + order.orderProductAmount * 24
      }
    })
    const costByUnit = amount / totalOfUnits
    const ordersIndirectCosts = orders.map(order => {
      if (order.orderProductAmountType === ORDER_PRODUCT_AMOUNT.UNIT) {
        return {
          id: order._id,
          indirectCost: this.roundToFixed(order.orderProductAmount * costByUnit)
        }
      }
      if (order.orderProductAmountType === ORDER_PRODUCT_AMOUNT.PAIR) {
        return {
          id: order._id,
          indirectCost: this.roundToFixed(
            order.orderProductAmount * costByUnit * 2
          )
        }
      }
      if (order.orderProductAmountType === ORDER_PRODUCT_AMOUNT.DOZEN) {
        return {
          id: order._id,
          indirectCost: this.roundToFixed(
            order.orderProductAmount * costByUnit * 24
          )
        }
      }
    })
    return ordersIndirectCosts
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
    if (data.body.category === EXPENSE_CATEGORIES.LABOUR) {
      await this.orderRepository.changeLabourCosts(
        { _id: data.body.singleOrder },
        data.body.amount
      )
    }
    if (data.body.category === EXPENSE_CATEGORIES.INDIRECT_COSTS) {
      const ordersIds = data.body.orderList.map(order => order.order)
      const orders = await this.orderRepository.getOrdersByIdWithoutPopulate(
        ordersIds
      )
      const ordersWithCosts = this.calculateIndirectCosts(
        orders,
        data.body.amount
      )
      ordersWithCosts.forEach(order => {
        this.orderRepository.changeIndirectCosts(
          { _id: order.id },
          order.indirectCost
        )
      })
    }
    const expense = await this.expenseRepository.createExpense(newExpense)
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
    const oldExpense =
      await this.expenseRepository.getExpenseByIdWithoutPopulate({
        _id: data.body._id
      })
    if (oldExpense.category === EXPENSE_CATEGORIES.LABOUR) {
      const newAmount = data.body.amount - oldExpense.amount
      await this.orderRepository.changeLabourCosts(
        { _id: oldExpense.singleOrder },
        newAmount
      )
    }
    if (oldExpense.category === EXPENSE_CATEGORIES.INDIRECT_COSTS) {
      const ordersIds = oldExpense.orderList.map(order => order.order)
      const orders = await this.orderRepository.getOrdersByIdWithoutPopulate(
        ordersIds
      )
      const ordersWithCosts = this.calculateIndirectCosts(
        orders,
        oldExpense.amount
      )
      ordersWithCosts.forEach(order => {
        this.orderRepository.changeIndirectCosts(
          { _id: order.id },
          -order.indirectCost
        )
      })

      const newOrdersIds = data.body.orderList.map(order => order.order)
      const newOrders = await this.orderRepository.getOrdersByIdWithoutPopulate(
        newOrdersIds
      )
      const newOrdersWithCosts = this.calculateIndirectCosts(
        newOrders,
        data.body.amount
      )
      newOrdersWithCosts.forEach(order => {
        this.orderRepository.changeIndirectCosts(
          { _id: order.id },
          order.indirectCost
        )
      })

    }
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
    if (data.body.category === EXPENSE_CATEGORIES.LABOUR) {
      await this.orderRepository.changeLabourCosts(
        { _id: data.body.singleOrder },
        -data.body.amount
      )
    }
    if (data.body.category === EXPENSE_CATEGORIES.INDIRECT_COSTS) {
      const ordersIds = data.body.orderList.map(order => order.order)
      const orders = await this.orderRepository.getOrdersByIdWithoutPopulate(
        ordersIds
      )
      const ordersWithCosts = this.calculateIndirectCosts(
        orders,
        data.body.amount
      )
      ordersWithCosts.forEach(order => {
        this.orderRepository.changeIndirectCosts(
          { _id: order.id },
          -order.indirectCost
        )
      })
    }
    const query = { _id: data.body._id }
    return this.expenseRepository.deleteExpense(query)
  }
}
