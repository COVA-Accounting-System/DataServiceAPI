import { Router } from 'express'
import _incomeService from '../services/income.service.js'
import { validateIncomeData } from '../middleware/validateData.middleware.js'

const router = Router()
const incomeService = new _incomeService()

router.get('/', async (req, res) => {
  try {
    const incomes = await incomeService.getIncomes(req)
    res.json(incomes)
  } catch (err) {
    console.error(err)
  }
})

router.post('/', validateIncomeData, async (req, res) => {
  try {
    const newIncome = await incomeService.createIncome(req)
    res.json(newIncome)
  } catch (err) {
    console.error(err)
  }
})

router.post('/createAndRegisterInOrder', validateIncomeData, async (req, res) => {
  try {
    const newIncome = await incomeService.createIncomeAndRegisterInOrder(req)
    res.json(newIncome)
  } catch (err) {
    console.error(err)
  }
})

router.put('/delete', async (req, res) => {
  try {
    const income = await incomeService.updateIncomeVisibility(req)
    res.json(income)
  } catch (err) {
    console.error(err)
  }
})

router.put('/update', async (req, res) => {
  try {
    const income = await incomeService.updateIncome(req)
    res.json(income)
  } catch (err) {
    console.error(err)
  }
})

export default router
