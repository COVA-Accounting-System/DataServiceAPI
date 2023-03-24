import { InventoryOutput } from '../models/inventoryOutput.model.js'
import _inventoryOutputRepository from '../data/inventoryOutput.repository.js'
import { Order } from '../models/order.model.js'
import _orderRepository from '../data/order.repository.js'

export default class inventoryOutputService {
  constructor () {
    this.inventoryOutputRepository = new _inventoryOutputRepository(
      InventoryOutput
    )
    this.orderRepository = new _orderRepository(Order)
  }

  async createInventoryOutput (data) {
    const newInventoryOutput = new InventoryOutput({
      ...data.body,
      userId: data.userId
    })
    return this.inventoryOutputRepository.createInventoryOutput(
      newInventoryOutput
    )
  }

  async createInventoryOutputAndRegisterInOrder (data) {
    const newInventoryOutput = new InventoryOutput({
      ...data.body,
      userId: data.userId
    })
    const inventoryOutput =
      await this.inventoryOutputRepository.createInventoryOutput(
        newInventoryOutput
      )
    await this.orderRepository.addToListOfInventoryOutput(
      data.body.order,
      inventoryOutput
    )
    return inventoryOutput
  }

  async deleteAndRemoveFromOrder (data) {
    const inventoryOutput =
      await this.inventoryOutputRepository.deleteInventoryOutput({
        _id: data.body._id
      })
    await this.orderRepository.removeFromListOfInventoryOutput(
      data.body.order,
      inventoryOutput
    )
    return inventoryOutput
  }

  async getInventoryOutputs (data) {
    const query = { userId: data.userId, isVisible: true }
    return this.inventoryOutputRepository.getInventoryOutputs(query)
  }

  async getInventoryOutput (query) {
    return this.inventoryOutputRepository.getInventoryOutput(query)
  }

  async updateInventoryOutputVisibility (data) {
    const query = { _id: data.body._id }
    const queryToUpdateWith = { isVisible: false }
    return this.inventoryOutputRepository.updateInventoryOutput(
      query,
      queryToUpdateWith
    )
  }

  async updateInventoryOutput (data) {
    const { _id, ...queryToUpdateWith } = data.body
    const query = { _id }
    return this.inventoryOutputRepository.updateInventoryOutput(
      query,
      queryToUpdateWith
    )
  }
}
