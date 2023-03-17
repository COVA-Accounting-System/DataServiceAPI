export default class orderRepository {
  constructor (Order) {
    this.Order = Order
  }

  async getOrder (query) {
    return this.Order.findOne(query)
      .populate('orderClient')
      .populate('orderProduct')
  }

  async getOrderById (id) {
    return this.Order.findById(id)
      .populate('orderClient')
      .populate('orderProduct')
  }

  async getOrders (query) {
    return this.Order.find(query)
      .populate('orderClient')
      .populate('orderProduct')
  }

  async createOrders (newOrder) {
    const order = await newOrder.save()
    return this.getOrder({ _id: order._id })
  }

  async updateOrder (query, queryToUpdateWith) {
    await this.Order.findOneAndUpdate(query, queryToUpdateWith)
    return this.getOrder(query)
  }
}
