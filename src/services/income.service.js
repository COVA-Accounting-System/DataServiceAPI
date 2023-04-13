import { Income } from '../models/income.model.js'
import _incomeRepository from '../data/income.repository.js'

import { Order } from '../models/order.model.js'
import _orderRepository from '../data/order.repository.js'

import { Config } from '../models/config.model.js'
import _configRepository from '../data/config.repository.js'

import { Client } from '../models/client.model.js'
import _clientRepository from '../data/client.repository.js'

export default class incomeService {
  constructor () {
    this.incomeRepository = new _incomeRepository(Income)
    this.orderRepository = new _orderRepository(Order)
    this.configRepository = new _configRepository(Config)
    this.clientRepository = new _clientRepository(Client)
  }

  async createIncome (data) {
    const newIncome = new Income({
      ...data.body,
      userId: data.userId
    })
    const income = this.incomeRepository.createIncome(newIncome)
    this.configRepository.updateConfig(
      { userId: data.userId },
      {
        $inc: { incomeNumber: 1 }
      }
    )
    return income
  }

  async createIncomeAndRegisterInOrder (data) {
    const newIncome = new Income({
      ...data.body,
      userId: data.userId
    })
    const income = await this.incomeRepository.createIncome(newIncome)
    await this.clientRepository.decreaseBalance(
      data.body.client,
      data.body.amount
    )
    if (data.body.typeOfIncome === 'Pago por adelantado') {
      await this.orderRepository.addToListOfIncomesPrePayed(
        data.body.order,
        income
      )
    }
    if (data.body.typeOfIncome === 'Pago de pedido entregado') {
      await this.orderRepository.addToListOfIncomes(data.body.order, income)
    }
    await this.configRepository.updateConfig(
      { userId: data.userId },
      {
        $inc: { incomeNumber: 1 }
      }
    )
    return income
  }

  async deleteAndRemoveFromOrder (data) {
    const income = await this.incomeRepository.deleteIncome({
      _id: data.body._id
    })
    await this.clientRepository.increaseBalance(
      data.body.client,
      data.body.amount
    )
    if (data.body.typeOfIncome === 'Pago por adelantado') {
      await this.orderRepository.removeFromListOfIncomesPrePayed(
        data.body.order,
        income
      )
    }
    if (data.body.typeOfIncome === 'Pago de pedido entregado') {
      await this.orderRepository.removeFromListOfIncomes(
        data.body.order,
        income
      )
    }
    return income
  }

  async getIncomes (data) {
    const query = { userId: data.userId, isVisible: true }
    return this.incomeRepository.getIncomes(query)
  }

  async getIncome (query) {
    return this.incomeRepository.getIncome(query)
  }

  async updateIncomeVisibility (data) {
    const query = { _id: data.body._id }
    const queryToUpdateWith = { isVisible: false }
    return this.incomeRepository.updateIncome(query, queryToUpdateWith)
  }

  async updateIncomeAndUpdateOrder (data) {
    const query = { _id: data.body._id }
    const queryToUpdateWith = { ...data.body }
    const oldIncome = await this.getIncome(query)
    await this.clientRepository.decreaseBalance(
      data.body.client,
      data.body.amount - oldIncome.amount
    )
    if (data.body.typeOfIncome === 'Pago por adelantado') {
      await this.orderRepository.updateItemFromListOfIncomesPrePayed(
        data.body.order,
        oldIncome,
        data.body.amount
      )
    }
    if (data.body.typeOfIncome === 'Pago de pedido entregado') {
      await this.orderRepository.updateItemFromListOfIncomes(
        data.body.order,
        oldIncome,
        data.body.amount
      )
    }
    const newIncome = await this.incomeRepository.updateIncome(
      query,
      queryToUpdateWith
    )
    return newIncome
  }

  async updateIncome (data) {
    const { _id, ...queryToUpdateWith } = data.body
    const query = { _id }
    return this.incomeRepository.updateIncome(query, queryToUpdateWith)
  }
}
