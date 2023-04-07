export default class clientRepository {
  constructor (Client) {
    this.Client = Client
  }

  async getClients (query) {
    return this.Client.find(query)
  }

  async getClient (query) {
    return this.Client.findOne(query)
  }

  async createClient (newClient) {
    return newClient.save()
  }

  async updateClient (query, queryToUpdateWith) {
    await this.Client.findOneAndUpdate(query, queryToUpdateWith)
    return this.getClient(query)
  }

  async increaseBalance (id, amount) {
    const query = { _id: id }
    const queryToUpdateWith = {
      $inc: {
        balance: amount
      }
    }
    await this.Client.findOneAndUpdate(query, queryToUpdateWith)
  }

  async decreaseBalance (id, amount) {
    const query = { _id: id }
    const queryToUpdateWith = {
      $inc: {
        balance: -amount
      }
    }
    await this.Client.findOneAndUpdate(query, queryToUpdateWith)
  }

  async deleteClient (query) {
    await this.Client.findOneAndDelete(query)
    return 'This client was deleted'
  }
}
