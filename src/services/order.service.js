import { Order } from '../models/order.model.js'
import _orderRepository from '../data/order.repository.js'

import {
  productionStage,
  maxProductionStage,
  minProductionStage
} from '../enums/productionStage.js'

export default class orderService {
  constructor () {
    this.orderRepository = new _orderRepository(Order)
  }

  async createOrder (data) {
    const newOrder = new Order({
      ...data.body,
      userId: data.userId
    })
    return this.orderRepository.createOrders(newOrder)
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
    return this.orderRepository.updateOrder(query, queryToUpdateWith)
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
}
