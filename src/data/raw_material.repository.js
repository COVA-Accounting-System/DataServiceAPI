
export default class rawMaterialRepository{
    constructor(RawMaterial){
        this.RawMaterial = RawMaterial;
    }

    async getRawMaterial(){
        return this.RawMaterial.find();
    }

    async createRawMaterial(newRawMaterial){
        return newRawMaterial.save();
    }
}