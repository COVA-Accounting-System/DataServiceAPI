import _costService from '../services/cost.service.js'
import { Router } from 'express'

const router = Router()
const costService = new _costService()

router.get('/', costService.getReportData)

router.post('/generateReport', costService.createReportAndReturnData)

router.post('/generateInitialReport', costService.generateInitialReport)

export default router
