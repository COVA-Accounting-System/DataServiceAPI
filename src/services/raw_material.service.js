import _rawMaterialRepository from "../data/raw_material.repository.js"
import {RawMaterial} from "../models/raw_material.model.js"

export default class rawMaterialService{
    constructor(){
        this.rawMaterialRepository = new _rawMaterialRepository(RawMaterial);
    }

    async getRawMaterials(){
        return this.rawMaterialRepository.getRawMaterial();
    }

    async createRawMaterial(data){
        const newRawMaterial = new RawMaterial ({
            name: data.body.name,
            amount: data.body.amount,
            unit: data.body.unit
        });
        return this.newRawMaterial.createRawMaterial(newRawMaterial);
    }
}