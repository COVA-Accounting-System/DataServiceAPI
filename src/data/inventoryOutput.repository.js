export default class inventoryOutputRepository {
  constructor (InventoryOutput) {
    this.InventoryOutput = InventoryOutput
  }

  async getInventoryOutput (query) {
    return this.InventoryOutput.findOne(query)
      .populate('listOfMaterials.rawMaterial')
      .populate('order')
  }

  async getInventoryOutputs (query) {
    return this.InventoryOutput.find(query)
      .populate('listOfMaterials.rawMaterial')
      .populate('order')
  }

  async createInventoryOutput (newInventoryOutput) {
    const inventoryOutput = await newInventoryOutput.save()
    console.log(inventoryOutput._id)
    return this.getInventoryOutput({ _id: inventoryOutput._id })
  }

  async updateInventoryOutput (query, queryToUpdateWith) {
    await this.InventoryOutput.findOneAndUpdate(query, queryToUpdateWith)
    return this.getInventoryOutput(query)
  }
}
