import express, { urlencoded } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import client from '../routes/client.route.js'
import employee from '../routes/employee.route.js'
import product from '../routes/product.route.js'
import provider from '../routes/provider.route.js'
import raw_material from '../routes/raw_material.route.js'
import income from '../routes/income.route.js'
import order from '../routes/order.route.js'
import expense from '../routes/expense.route.js'
import inventoryInput from '../routes/inventoryInput.route.js'
import inventoryOutput from '../routes/inventoryOutput.route.js'
import config from '../routes/config.route.js'
import cost from '../routes/cost.route.js'
import { verifyToken } from '../middleware/auth.middleware.js'
import '../config/database.config.js'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(urlencoded({ extended: false }))

// routes
app.get('/', (req, res) => {
  res.json({ message: 'welcome to inventory-api' })
})

// CONTACTS
app.use('/api/contact/client', verifyToken, client)
app.use('/api/contact/employee', verifyToken, employee)
app.use('/api/contact/provider', verifyToken, provider)

// INVENTORY
app.use('/api/inventory/raw_material', verifyToken, raw_material)
app.use('/api/inventory/inventory_input', verifyToken, inventoryInput)
app.use('/api/inventory/inventory_output', verifyToken, inventoryOutput)

// ACCOUNTING
app.use('/api/accounting/income', verifyToken, income)
app.use('/api/accounting/expense', verifyToken, expense)

// PRODCUTION
app.use('/api/product', verifyToken, product)
app.use('/api/order', verifyToken, order)

// COSTS
app.use('/api/cost', verifyToken, cost)

// CONFIG
app.use('/api/config', verifyToken, config)

export default app
