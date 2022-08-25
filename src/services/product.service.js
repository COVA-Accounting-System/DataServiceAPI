import _productRespository from "../data/product.repository.js"
import {Product} from "../models/product.model.js"

export default class productService{
    constructor(){
        this.productRepository = new _productRespository(Product);
    }

    async getProducts(){
        return this.productRepository.getProducts();
    }

    async createProduct(data){
        const newProduct = new Product({
            name: data.body.name,
            description: data.body.description,
            photography: data.body.photography,
            unitPrice: data.body.unitPrice,
            dozenPrice: data.body.dozenPrice
        });
        return this.productRepository.createProduct(newProduct);
    }

    async updateProductVisibility(data){
        const query = data.body
        const queryToUpdateWith = {isVisible: false}
        return this.productRepository.updateProduct(query, queryToUpdateWith);
    }

    async deleteProduct(data){
        const query = data.body;
        return this.productRepository.deleteProduct(query);
    }
}