export default class providerRepository {
  constructor(Provider) {
    this.Provider = Provider;
  }

  async getProvider(query) {
    return this.Provider.findOne(query);
  }

  async getProviders(query) {
    return this.Provider.find(query);
  }

  async createProvider(newProvider) {
    return newProvider.save();
  }

  async updateProvider(query, queryToUpdateWith) {
    await this.Provider.findOneAndUpdate(query, queryToUpdateWith);
    return this.getProvider(query);
  }

  async deleteProvider(query) {
    await this.Provider.findOneAndDelete(query);
    return `This provider was deleted`;
  }
}
