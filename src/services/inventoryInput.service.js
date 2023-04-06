import { InventoryInput } from '../models/inventoryInput.model.js'
import _inventoryInputRepository from '../data/inventoryInput.repository.js'

import { Config } from '../models/config.model.js'
import _configRepository from '../data/config.repository.js'

export default class inventoryInputService {
  constructor () {
    this.inventoryInputRepository = new _inventoryInputRepository(
      InventoryInput
    )
    this.configRepository = new _configRepository(Config)
  }

  async createInventoryInput (data) {
    const newInventoryInput = new InventoryInput({
      ...data.body,
      userId: data.userId
    })
    const inventoryInput =
      this.inventoryInputRepository.createInventoryInput(newInventoryInput)
    this.configRepository.updateConfig(
      { userId: data.userId },
      {
        $inc: { inventoryInputNumber: 1 }
      }
    )
    return inventoryInput
  }

  async getInventoryInputs (data) {
    const query = { userId: data.userId, isVisible: true }
    return this.inventoryInputRepository.getInventoryInputs(query)
  }

  async getInventoryInput (query) {
    return this.inventoryInputRepository.getInventoryInput(query)
  }

  async updateInventoryInputVisibility (data) {
    const query = { _id: data.body._id }
    const queryToUpdateWith = { isVisible: false }
    return this.inventoryInputRepository.updateInventoryInput(
      query,
      queryToUpdateWith
    )
  }

  async updateInventoryInput (data) {
    const { _id, ...queryToUpdateWith } = data.body
    const query = { _id }
    return this.inventoryInputRepository.updateInventoryInput(
      query,
      queryToUpdateWith
    )
  }
}
