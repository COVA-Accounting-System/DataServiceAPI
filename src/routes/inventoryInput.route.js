import { Router } from 'express'
import _inventoryInputService from '../services/inventoryInput.service.js'
import { validateInventoryInputData } from '../middleware/validateData.middleware.js'

const router = Router()
const inventoryInputService = new _inventoryInputService()

router.get('/', async (req, res) => {
  try {
    const inventoryEntries = await inventoryInputService.getInventoryInputs(req)
    res.json(inventoryEntries)
  } catch (err) {
    console.error(err)
  }
})

router.post('/', validateInventoryInputData, async (req, res) => {
  try {
    const newInventoryInput = await inventoryInputService.createInventoryInput(req)
    res.json(newInventoryInput)
  } catch (err) {
    console.error(err)
  }
})

router.put('/delete', async (req, res) => {
  try {
    const inventoryInput = await inventoryInputService.updateInventoryInputVisibility(req)
    res.json(inventoryInput)
  } catch (err) {
    console.error(err)
  }
})

router.put('/update', async (req, res) => {
  try {
    const inventoryInput = await inventoryInputService.updateInventoryInput(req)
    res.json(inventoryInput)
  } catch (err) {
    console.error(err)
  }
})

export default router
