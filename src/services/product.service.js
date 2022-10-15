import _productRespository from "../data/product.repository.js";
import { Product } from "../models/product.model.js";

export default class productService {
  constructor() {
    this.productRepository = new _productRespository(Product);
  }

  async getProducts(data) {
    const query = { userId: data.userId, isVisible: true }
    return this.productRepository.getProducts(query);
  }

  async createProduct(data) {
    const newProduct = new Product({
      ...data.body, userId: data.userId
    });
    return this.productRepository.createProduct(newProduct);
  }

  async updateProductVisibility(data) {
    const query = {_id: data.body._id};
    const queryToUpdateWith = { isVisible: false };
    return this.productRepository.updateProduct(query, queryToUpdateWith);
  }

  async updateProduct(data){
    const {_id, ...queryToUpdateWith} = data.body;
    const query = {_id};
    return this.productRepository.updateProduct(query, queryToUpdateWith);
  }

  async deleteProduct(data) {
    const query = data.body;
    return this.productRepository.deleteProduct(query);
  }
}
