// import _clientRepository from '../data/client.repository.js'
// import { Client } from '../models/client.model.js'
import { Expense } from '../models/expense.model.js'
import _expenseRepository from '../data/expense.repository.js'

import { Cost } from '../models/cost.model.js'
import _costRepository from '../data/cost.repository.js'

export default class costService {
  constructor () {
    this.expenseRepository = new _expenseRepository(Expense)
    this.costRepository = new _costRepository(Cost)
  }

  createReportAndReturnData = async (req, res) => {
    try {
      const expensesArray = await this.expenseRepository.getExpensesByDate(
        req.body.startDate,
        req.body.endDate,
        req.userId
      )

      const expenses = expensesArray.map((expense) => (
        { expense: expense._id }
      ))

      const existingCostReport = await this.costRepository.getCostReport({
        userId: req.userId
      })

      if (!existingCostReport) {
        const newCostReport = new Cost({
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          expenses,
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

  getReportData = async (req, res) => {
    try {
      const userId = req.userId
      const costReport = await this.costRepository.getCostReport({
        _id: userId
      })
      res.status(200).json(costReport)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }
}
