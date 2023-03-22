import { Router } from 'express'
import _inventoryOutputService from '../services/inventoryOutput.service.js'
import { validateInventoryOutputData } from '../middleware/validateData.middleware.js'

const router = Router()
const inventoryOutputService = new _inventoryOutputService()

router.get('/', async (req, res) => {
  try {
    const inventoryOutput = await inventoryOutputService.getInventoryOutputs(req)
    res.json(inventoryOutput)
  } catch (err) {
    console.error(err)
  }
})

router.post('/', validateInventoryOutputData, async (req, res) => {
  try {
    const newInventoryOutput = await inventoryOutputService.createInventoryOutput(req)
    res.json(newInventoryOutput)
  } catch (err) {
    console.error(err)
  }
})

router.put('/delete', async (req, res) => {
  try {
    const inventoryOutput = await inventoryOutputService.updateInventoryOutputVisibility(req)
    res.json(inventoryOutput)
  } catch (err) {
    console.error(err)
  }
})

router.put('/update', async (req, res) => {
  try {
    const inventoryOutput = await inventoryOutputService.updateInventoryOutput(req)
    res.json(inventoryOutput)
  } catch (err) {
    console.error(err)
  }
})

export default router
