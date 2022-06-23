

export default class productRepository{
    constructor(Product){
        this.Product = Product;
    }
    async createProduct(newProduct){
        return newProduct.save();
    }

    async getProducts(){
        return this.Product.find();
    }
}