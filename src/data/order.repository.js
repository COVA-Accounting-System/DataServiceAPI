export default class orderRepository {
  constructor (Order) {
    this.Order = Order
  }

  async getOrder (query) {
    return this.Order.findOne(query)
  }

  async getOrders (query) {
    return this.Order.find(query)
  }

  async createOrders (newOrder) {
    return newOrder.save()
  }

  async updateOrder (query, queryToUpdateWith) {
    await this.Order.findOneAndUpdate(query, queryToUpdateWith)
    return this.getOrder(query)
  }
}
