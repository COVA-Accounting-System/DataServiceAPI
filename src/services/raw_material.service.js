import _rawMaterialRepository from "../data/raw_material.repository.js"
import {RawMaterial} from "../models/raw_material.model.js"

export default class rawMaterialService{
    constructor(){
        this.rawMaterialRepository = new _rawMaterialRepository(RawMaterial);
    }

    async getRawMaterials(){
        return this.rawMaterialRepository.getRawMaterials();
    }

    async createRawMaterial(data){
        const newRawMaterial = new RawMaterial ({
            name: data.body.name,
            amount: data.body.amount,
            unit: data.body.unit
        });
        return this.rawMaterialRepository.createRawMaterial(newRawMaterial);
    }

    async updateRawMaterialVisibility(data){
        const query = data.body
        const queryToUpdateWith = {isVisible: false}
        return this.rawMaterialRepository.updateRawMaterial(query, queryToUpdateWith);
    }

    async deleteRawMaterial(data){
        const query = data.body;
        return this.rawMaterialRepository.deleteRawMaterial(query);
    }
}