export default class orderRepository {
  constructor (Order) {
    this.Order = Order
  }

  async getOrder (query) {
    return this.Order.findOne(query)
      .populate('orderClient')
      .populate('orderProduct')
      .populate({
        path: 'listOfInventoryOutputs',
        populate: {
          path: 'inventoryOutput',
          populate: {
            path: 'listOfMaterials',
            populate: {
              path: 'rawMaterial'
            }
          }
        }
      })
      .populate({
        path: 'listOfIncomes',
        populate: {
          path: 'income',
          model: 'Income'
        }
      })
  }

  async getOrdersByIdWithoutPopulate (ordersIds) {
    return this.Order.find({ _id: { $in: ordersIds } })
  }

  async getOrderByIdWithoutPopulate (id) {
    return this.Order.findById(id)
  }

  async getOrderById (id) {
    return this.Order.findById(id)
      .populate('orderClient')
      .populate('orderProduct')
      .populate('listOfIncomes')
      .populate({
        path: 'listOfInventoryOutputs',
        populate: {
          path: 'inventoryOutput',
          populate: {
            path: 'listOfMaterials',
            populate: {
              path: 'rawMaterial'
            }
          }
        }
      })
      .populate({
        path: 'listOfIncomes',
        populate: {
          path: 'income',
          model: 'Income'
        }
      })
  }

  async getOrderByIdWithoutPopulate (id) {
    return this.Order.findById(id)
  }

  async getOrders (query) {
    return this.Order.find(query)
      .populate('orderClient')
      .populate('orderProduct')
      .populate('listOfIncomes')
      .populate({
        path: 'listOfInventoryOutputs',
        populate: {
          path: 'inventoryOutput',
          populate: {
            path: 'listOfMaterials',
            populate: {
              path: 'rawMaterial'
            }
          }
        }
      })
      .populate({
        path: 'listOfIncomes',
        populate: {
          path: 'income',
          model: 'Income'
        }
      })
  }

  async addToListOfIncomesPrePayed (id, income) {
    const query = { _id: id }
    const queryToUpdateWith = {
      $push: { listOfIncomes: { income: income._id } },
      $inc: { orderBalance: -income.amount, orderPrePayedPrice: income.amount }
    }
    return this.updateOrder(query, queryToUpdateWith)
  }

  async removeFromListOfIncomesPrePayed (id, income) {
    const query = { _id: id }
    const queryToUpdateWith = {
      $pull: { listOfIncomes: { income: income._id } },
      $inc: { orderBalance: income.amount, orderPrePayedPrice: -income.amount }
    }
    return this.updateOrder(query, queryToUpdateWith)
  }

  async updateItemFromListOfIncomesPrePayed (id, oldIncome, newAmount) {
    const query = { _id: id }
    const queryToUpdateWith = {
      $inc: {
        orderBalance: -(newAmount - oldIncome.amount),
        orderPrePayedPrice: newAmount - oldIncome.amount
      }
    }
    return this.updateOrder(query, queryToUpdateWith)
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

  async updateItemFromListOfIncomes (id, oldIncome, newAmount) {
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

  async updateOrderMaterialCost (id, oldMaterialCost, newMaterialCost) {
    const query = { _id: id }
    const queryToUpdateWith = {
      $inc: {
        orderMaterialCosts: newMaterialCost - oldMaterialCost
      }
    }
    return this.updateOrder(query, queryToUpdateWith)
  }

  async getFinishedOrderByDate (startDate, endDate, userId) {
    return this.Order.find({
      orderStateNumber: {
        $gte: 2
      },
      orderDate: {
        $gte: startDate,
        $lte: endDate
      },
      isVisible: true,
      userId
    })
  }

  async changeLabourCosts (id, newLabourCosts) {
    return this.Order.findOneAndUpdate(
      id,
      { $inc: { orderLabourCosts: newLabourCosts } }
    )
  }

  async changeIndirectCosts (id, newIndirectCosts) {
    // console.log('aqui si entra' + id + 'para restar' + newIndirectCosts)
    const order =  await this.Order.findOneAndUpdate(
      id,
      { $inc: { orderIndirectCosts: newIndirectCosts } }
      , { new: true }
    )
    // console.log(order)
    return order
  }
}
