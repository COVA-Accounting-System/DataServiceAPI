import _rawMaterialRepository from "../data/raw_material.repository.js";
import { RawMaterial } from "../models/raw_material.model.js";

export default class rawMaterialService {
  constructor() {
    this.rawMaterialRepository = new _rawMaterialRepository(RawMaterial);
  }

  async getRawMaterials(data) {
    const query = { userId: data.userId, isVisible: true }
    return this.rawMaterialRepository.getRawMaterials(query);
  }

  async createRawMaterial(data) {
    const newRawMaterial = new RawMaterial({
      ...data.body, userId: data.userId
    });
    return this.rawMaterialRepository.createRawMaterial(newRawMaterial);
  }

  async updateRawMaterialVisibility(data) {
    const query = data.body;
    const queryToUpdateWith = { isVisible: false };
    return this.rawMaterialRepository.updateRawMaterial(
      query,
      queryToUpdateWith
    );
  }

  async deleteRawMaterial(data) {
    const query = data.body;
    return this.rawMaterialRepository.deleteRawMaterial(query);
  }
}
