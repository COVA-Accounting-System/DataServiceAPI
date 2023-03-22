import { Router } from 'express'
import _providerService from '../services/provider.service.js'
import { validateProviderData } from '../middleware/validateData.middleware.js'

const router = Router()
const providerService = new _providerService()

router.get('/', async (req, res) => {
  try {
    const providers = await providerService.getProviders(req)
    res.json(providers)
  } catch (err) {
    console.error(err)
  }
})

router.post('/', validateProviderData, async (req, res) => {
  try {
    const newProvider = await providerService.createProviders(req)
    res.json(newProvider)
  } catch (err) {
    console.error(err)
  }
})

router.put('/delete', async (req, res) => {
  try {
    const provider = await providerService.updateProviderVisibility(req)
    res.json(provider)
  } catch (err) {
    console.error(err)
  }
})

router.put('/update', async (req, res) => {
  try {
    const provider = await providerService.updateProvider(req)
    res.json(provider)
  } catch (err) {
    console.error(err)
  }
})

router.delete('/query', async (req, res) => {
  try {
    await providerService.deleteProvider(req)
    res.send('This provider was deleted')
  } catch (err) {
    console.error(err)
  }
})

export default router
