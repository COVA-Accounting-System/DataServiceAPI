import { Order } from '../models/order.model.js'
import _orderRepository from '../data/order.repository.js'

export default class orderService {
  constructor () {
    this.orderRepository = new _orderRepository(Order)
  }

  async createOrder (data) {
    const newOrder = new Order({ ...data.body, userId: data.userId, orderState: 'Pending' })
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

  async changeStateBackward (data) {
    const orderToChange = await this.orderRepository.getOrder(data.body)
    orderToChange.moveBackward()
    return this.orderRepository.updateOrder(data.body, orderToChange)
  }

  async changeStateFordward (data) {
    const orderToChange = await this.orderRepository.getOrder(data.body)
    orderToChange.moveForward()
    return this.orderRepository.updateOrder(data.body, orderToChange)
  }
}
