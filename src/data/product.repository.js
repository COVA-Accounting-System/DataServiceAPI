import {Product} from "../models/product.model.js"

export default class productRepository{
    
    async createProduct(data){
        const newProduct = new Product({
            name: data.body.name,
            photography: data.body.photography,
            unitPrice: data.body.unitPrice,
            dozenPrice: data.body.dozenPrice
        });
        return newProduct.save();
    }

    async getProdutcs(){
        return Product.find();
    }
}