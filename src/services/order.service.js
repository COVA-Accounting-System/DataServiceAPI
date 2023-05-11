import { Order } from '../models/order.model.js'
import _orderRepository from '../data/order.repository.js'

import { Config } from '../models/config.model.js'
import _configRepository from '../data/config.repository.js'

import _expenseService from './expense.service.js'

import { Client } from '../models/client.model.js'
import _clientRepository from '../data/client.repository.js'

import {
  productionStage,
  maxProductionStage,
  minProductionStage
} from '../enums/productionStage.js'

export default class orderService {
  constructor () {
    this.orderRepository = new _orderRepository(Order)
    this.configRepository = new _configRepository(Config)
    this.expenseService = new _expenseService()
    this.clientRepository = new _clientRepository(Client)
  }

  async createOrder (data) {
    const newOrder = new Order({
      ...data.body,
      userId: data.userId
    })
    const order = this.orderRepository.createOrders(newOrder)
    this.configRepository.updateConfig(
      { userId: data.userId },
      {
        $inc: { orderNumber: 1 }
      }
    )
    return order
  }

  async getOrders (data) {
    const query = { userId: data.userId, isVisible: true }
    return this.orderRepository.getOrders(query)
  }

  async getOrder (query) {
    return this.orderRepository.getOrder(query)
  }

  async updateOrderVisibility (data) {
    const query = { _id: data.body._id }
    const queryToUpdateWith = { isVisible: false }
    return this.orderRepository.updateOrder(query, queryToUpdateWith)
  }

  async updateOrder (data) {
    const { _id, ...queryToUpdateWith } = data.body
    const query = { _id }
    delete queryToUpdateWith.orderIndirectCosts
    await this.expenseService.updateRemoveIndirectExpensesOfAnOrder(data.body._id)
    const order = await this.orderRepository.updateOrder(query, queryToUpdateWith)
    await this.expenseService.updateAddIndirectExpensesOfAnOrder(data.body._id)
   
    return {}
  }

  async changeStateBackward (data) {
    if (data.body.orderStateNumber !== minProductionStage) {
      const query = { _id: data.body._id }
      const queryToUpdateWith = {
        orderState: productionStage[data.body.orderStateNumber - 1].state,
        orderStateNumber: data.body.orderStateNumber - 1
      }
      return this.orderRepository.updateOrder(query, queryToUpdateWith)
    }
    return null
  }

  async changeStateFordward (data) {
    if (data.body.orderStateNumber !== maxProductionStage) {
      const query = { _id: data.body._id }
      const queryToUpdateWith = {
        orderState: productionStage[data.body.orderStateNumber + 1].state,
        orderStateNumber: data.body.orderStateNumber + 1
      }
      return this.orderRepository.updateOrder(query, queryToUpdateWith)
    }
    return null
  }

  async changeStateToNotPaid (data) {
    const query = { _id: data.body._id }
    const queryToUpdateWith = {
      orderPaidState: 'Not paid',
      orderPaidStateNumber: 0
    }
    return this.orderRepository.updateOrder(query, queryToUpdateWith)
  }

  async changeStateToPartialPayment (data) {
    const query = { _id: data.body._id }
    const queryToUpdateWith = {
      orderPaidState: 'Partial payment',
      orderPaidStateNumber: 1
    }
    return this.orderRepository.updateOrder(query, queryToUpdateWith)
  }

  async changeStatePaid (data) {
    const query = { _id: data.body._id }
    const queryToUpdateWith = {
      orderPaidState: 'Paid',
      orderPaidStateNumber: 2
    }
    return this.orderRepository.updateOrder(query, queryToUpdateWith)
  }

  async updateStateToNotDelivered (data) {
    const order = await this.updateOrder(data)
    await this.clientRepository.decreaseBalance(
      data.body.orderClient,
      data.body.orderBalance
    )
    return order
  }

  async updateStateToDelivered (data) {
    const order = await this.updateOrder(data)
    await this.clientRepository.increaseBalance(
      data.body.orderClient,
      data.body.orderBalance
    )
    return order
  }
}
