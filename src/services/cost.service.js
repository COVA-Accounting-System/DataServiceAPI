// import _clientRepository from '../data/client.repository.js'
// import { Client } from '../models/client.model.js'
import { Expense } from '../models/expense.model.js'
import _expenseRepository from '../data/expense.repository.js'
import { Order } from '../models/order.model.js'
import _orderRepository from '../data/order.repository.js'

import { Cost } from '../models/cost.model.js'
import _costRepository from '../data/cost.repository.js'

export default class costService {
  constructor () {
    this.expenseRepository = new _expenseRepository(Expense)
    this.costRepository = new _costRepository(Cost)
    this.orderRepository = new _orderRepository(Order)
  }

  createReportAndReturnData = async (req, res) => {
    try {
      const expensesArray = await this.expenseRepository.getExpensesByDate(
        req.body.startDate,
        req.body.endDate,
        req.userId
      )

      const expenses = expensesArray.map(expense => ({ expense: expense._id }))

      const ordersArray = await this.orderRepository.getFinishedOrderByDate(
        req.body.startDate,
        req.body.endDate,
        req.userId
      )

      const orders = ordersArray.map(order => ({ order: order._id }))

      const existingCostReport = await this.costRepository.getCostReport({
        userId: req.userId
      })

      if (!existingCostReport) {
        const newCostReport = new Cost({
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          expenses,
          orders,
          userId: req.userId
        })

        const costReport = await this.costRepository.createCostReport(
          newCostReport
        )

        return res.status(200).json(costReport)
      }

      const editedCostReport = await this.costRepository.updateCostReport(
        { userId: req.userId },
        {
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          expenses
        }
      )

      res.status(200).json(editedCostReport)
    } catch (err) {
      console.error(err)
      res.status(400).json({ message: err.message })
    }
  }

  generateInitialReport = async (req, res) => {
    try {
      const existingCostReport = await this.costRepository.getCostReport({
        userId: req.userId
      })

      if (!existingCostReport) {
        return res
          .status(400)
          .json({ message: 'Does not exist a report for this user' })
      }

      const expensesArray = await this.expenseRepository.getExpensesByDate(
        existingCostReport.startDate,
        existingCostReport.endDate,
        existingCostReport.userId
      )

      const expenses = expensesArray.map(expense => ({ expense: expense._id }))

      const ordersArray = await this.orderRepository.getFinishedOrderByDate(
        existingCostReport.startDate,
        existingCostReport.endDate,
        existingCostReport.userId
      )

      const orders = ordersArray.map(order => ({ order: order._id }))

      const newCostReport = await this.costRepository.updateCostReport(
        { userId: req.userId },
        {
          startDate: existingCostReport.startDate,
          endDate: existingCostReport.endDate,
          expenses,
          orders
        }
      )

      res.status(200).json(newCostReport)
    } catch (err) {
      console.error(err)
      res.status(400).json({ message: err.message })
    }
  }

  getReportData = async (req, res) => {
    try {
      const userId = req.userId
      const costReport = await this.costRepository.getCostReport({
        userId
      })
      res.status(200).json(costReport)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }
}
