import { InventoryInput } from '../models/inventoryInput.model.js'
import _inventoryInputRepository from '../data/inventoryInput.repository.js'

export default class inventoryInputService {
  constructor () {
    this.inventoryInputRepository = new _inventoryInputRepository(InventoryInput)
  }

  async createInventoryInput (data) {
    const newInventoryInput = new InventoryInput({
      ...data.body,
      userId: data.userId
    })
    return this.inventoryInputRepository.createInventoryInput(newInventoryInput)
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
    return this.inventoryInputRepository.updateInventoryInput(query, queryToUpdateWith)
  }

  async updateInventoryInput (data) {
    const { _id, ...queryToUpdateWith } = data.body
    const query = { _id }
    return this.inventoryInputRepository.updateInventoryInput(query, queryToUpdateWith)
  }
}
