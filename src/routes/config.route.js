import _configService from '../services/config.service.js'
import { Router } from 'express'

const router = Router()
const configService = new _configService()

router.get('/getAccountConfig', async (req, res) => {
  try {
    const config = await configService.getConfig(req)
    res.json(config)
  } catch (error) {
    console.error(error)
  }
})

router.post('/createConfig', async (req, res) => {
  try {
    const newConfig = await configService.createConfig(req)
    res.json(newConfig)
  } catch (error) {
    console.error(error)
  }
})

export default router
