export default class productRepository {
  constructor(Product) {
    this.Product = Product;
  }

  async getProduct(query) {
    return this.Product.findOne(query);
  }

  async createProduct(newProduct) {
    return newProduct.save();
  }

  async getProducts(query) {
    return this.Product.find(query);
  }

  async updateProduct(query, queryToUpdateWith) {
    await this.Product.findOneAndUpdate(query, queryToUpdateWith);
    return this.getProduct(query);
  }

  async deleteProduct(query) {
    await this.Product.findOneAndDelete(query);
    return `This product was deleted`;
  }
}
