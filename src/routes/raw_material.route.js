import { Router } from 'express'
import _rawMaterialService from '../services/raw_material.service.js'
import { validateRawMaterialData } from '../middleware/validateData.middleware.js'

const router = Router()
const rawMaterialService = new _rawMaterialService()

router.get('/', async (req, res) => {
  try {
    const rawMaterials = await rawMaterialService.getRawMaterials(req)
    res.json(rawMaterials)
  } catch (err) {
    console.error(err)
  }
})

router.post('/', validateRawMaterialData, async (req, res) => {
  try {
    const newRawMaterial = await rawMaterialService.createRawMaterial(req)
    res.json(newRawMaterial)
  } catch (err) {
    console.error(err)
  }
})

router.put('/update', async (req, res) => {
  console.log(req.body)
  try {
    const rawMaterial = await rawMaterialService.updateRawMaterial(req)
    res.json(rawMaterial)
  } catch (err) {
    console.error(err)
  }
})

router.put('/delete', async (req, res) => {
  try {
    const rawMaterial = await rawMaterialService.updateRawMaterialVisibility(
      req
    )
    res.json(rawMaterial)
  } catch (err) {
    console.error(err)
  }
})

router.delete('/query', async (req, res) => {
  try {
    await rawMaterialService.deleteRawMaterial(req)
    res.send('This raw material was deleted')
  } catch (err) {
    console.error(err)
  }
})

export default router
