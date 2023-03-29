export default class orderRepository {
  constructor (Order) {
    this.Order = Order
  }

  async getOrder (query) {
    return this.Order.findOne(query)
      .populate('orderClient')
      .populate('orderProduct')
      .populate('listOfIncomes')
      .populate('listOfInventoryOutputs')
  }

  async getOrderById (id) {
    return this.Order.findById(id)
      .populate('orderClient')
      .populate('orderProduct')
      .populate('listOfIncomes')
      .populate('listOfInventoryOutputs')
  }

  async getOrders (query) {
    return this.Order.find(query)
      .populate('orderClient')
      .populate('orderProduct')
      .populate('listOfIncomes')
      .populate('listOfInventoryOutputs')
  }

  async addToListOfIncomes (id, income) {
    const query = { _id: id }
    const queryToUpdateWith = {
      $push: { listOfIncomes: { income: income._id } },
      $inc: { orderBalance: -income.amount, orderPayedPrice: income.amount }
    }
    return this.updateOrder(query, queryToUpdateWith)
  }

  async removeFromListOfIncomes (id, income) {
    const query = { _id: id }
    const queryToUpdateWith = {
      $pull: { listOfIncomes: { income: income._id } },
      $inc: { orderBalance: income.amount, orderPayedPrice: -income.amount }
    }
    return this.updateOrder(query, queryToUpdateWith)
  }

  async addToListOfInventoryOutput (id, inventoryOutput) {
    const query = { _id: id }
    const queryToUpdateWith = {
      $push: {
        listOfInventoryOutputs: { inventoryOutput: inventoryOutput._id }
      },
      $inc: { orderMaterialCosts: inventoryOutput.estimatedPrice }
    }
    return this.updateOrder(query, queryToUpdateWith)
  }

  async updateItemFromListOfIncomes (id, oldIncome, newAmount) {
    console.log(oldIncome.amount)
    console.log(newAmount)
    const query = { _id: id }
    const queryToUpdateWith = {
      $inc: {
        orderBalance: -(newAmount - oldIncome.amount),
        orderPayedPrice: newAmount - oldIncome.amount
      }
    }
    // const queryToUpdateWith = income
    return this.updateOrder(query, queryToUpdateWith)
  }

  async removeFromListOfInventoryOutput (id, inventoryOutput) {
    const query = { _id: id }
    const queryToUpdateWith = {
      $pull: {
        listOfInventoryOutputs: { inventoryOutput: inventoryOutput._id }
      },
      $inc: { orderMaterialCosts: -inventoryOutput.estimatedPrice }
    }
    return this.updateOrder(query, queryToUpdateWith)
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
