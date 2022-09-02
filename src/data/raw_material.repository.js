export default class rawMaterialRepository {
  constructor(RawMaterial) {
    this.RawMaterial = RawMaterial;
  }

  async getRawMaterial(query) {
    return this.RawMaterial.findOne(query);
  }

  async getRawMaterials() {
    return this.RawMaterial.find();
  }

  async createRawMaterial(newRawMaterial) {
    return newRawMaterial.save();
  }

  async updateRawMaterial(query, queryToUpdateWith) {
    await this.RawMaterial.findOneAndUpdate(query, queryToUpdateWith);
    return this.getRawMaterial(query);
  }

  async deleteRawMaterial(query) {
    await this.RawMaterial.findOneAndDelete(query);
    return `This raw material was deleted`;
  }
}
