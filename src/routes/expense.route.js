import { Router } from 'express'
import _expenseService from '../services/expense.service.js'
import { validateExpenseData } from '../middleware/validateData.middleware.js'

const expenseService = new _expenseService()
const router = Router()

router.get('/', async (req, res) => {
  try {
    const expenses = await expenseService.getExpenses(req)
    res.json(expenses)
  } catch (err) {
    console.error(err)
  }
})

router.post('/createExpenseOfInventoryInput', async (req, res) => {
  try {
    const newExpense = await expenseService.createExpenseOfInventoryInput(req)
    res.json(newExpense)
  } catch (err) {
    console.error(err)
  }
})

router.post('/', validateExpenseData, async (req, res) => {
  try {
    const newExpense = await expenseService.createExpense(req)
    res.json(newExpense)
  } catch (err) {
    console.error(err)
  }
})

router.put('/delete', async (req, res) => {
  try {
    const expense = await expenseService.deleteExpense(req)
    res.json(expense)
  } catch (err) {
    console.error(err)
  }
})

router.put('/deleteExpenseAndInventoryInput', async (req, res) => {
  try {
    const expense = await expenseService.deleteExpenseAndInventoryInput(req)
    res.json(expense)
  } catch (err) {
    console.error(err)
  }
})

router.put('/update', async (req, res) => {
  try {
    const expense = await expenseService.updateExpense(req)
    res.json(expense)
  } catch (err) {
    console.error(err)
  }
})

router.put('/updateExpenseAndInventoryInput', async (req, res) => {
  try {
    const expense = await expenseService.updateExpenseAndInventoryInput(req)
    res.json(expense)
  } catch (err) {
    console.error(err)
  }
})

router.delete('/delete', async (req, res) => {
  try {
    await expenseService.deleteExpense(req)
    res.send('This expense was deleted')
  } catch (err) {
    console.error(err)
  }
})

export default router
