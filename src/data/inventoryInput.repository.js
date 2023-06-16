export default class inventoryInputRepository {
  constructor (InventoryInput) {
    this.InventoryInput = InventoryInput
  }

  async getInventoryInput (query) {
    return this.InventoryInput.findOne(query)
      .populate('listOfMaterials.rawMaterial')
      .populate('provider')
  }

  async getInventoryInputs (query) {
    return this.InventoryInput.find(query)
      .populate('listOfMaterials.rawMaterial')
      .populate('provider')
  }

  async createInventoryInput (newInventoryInput) {
    const inventoryInput = await newInventoryInput.save()
    console.log(inventoryInput._id)
    return this.getInventoryInput({ _id: inventoryInput._id })
  }

  async updateInventoryInput (query, queryToUpdateWith) {
    await this.InventoryInput.findOneAndUpdate(query, queryToUpdateWith)
    return this.getInventoryInput(query)
  }

  async deleteInventoryInput (query) {
    return this.InventoryInput.findOneAndDelete(query)
  }
}
