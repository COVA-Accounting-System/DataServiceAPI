import _productRespository from "../data/product.repository.js"


export default class productService{
    constructor(){
        this.productRepository = new _productRespository();
    }

    async getProducts(){
        return this.productRepository.getProdutcs();
    }

    async createProduct(data){
        return this.productRepository.createProduct(data);
    }
}