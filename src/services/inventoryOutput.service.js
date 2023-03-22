import { InventoryOutput } from '../models/inventoryOutput.model.js'
import _inventoryOutputRepository from '../data/inventoryOutput.repository.js'

export default class inventoryOutputService {
  constructor () {
    this.inventoryOutputRepository = new _inventoryOutputRepository(InventoryOutput)
  }

  async createInventoryOutput (data) {
    const newInventoryOutput = new InventoryOutput({
      ...data.body,
      userId: data.userId
    })
    return this.inventoryOutputRepository.createInventoryOutput(newInventoryOutput)
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
    return this.inventoryOutputRepository.updateInventoryOutput(query, queryToUpdateWith)
  }

  async updateInventoryOutput (data) {
    const { _id, ...queryToUpdateWith } = data.body
    const query = { _id }
    return this.inventoryOutputRepository.updateInventoryOutput(query, queryToUpdateWith)
  }
}
