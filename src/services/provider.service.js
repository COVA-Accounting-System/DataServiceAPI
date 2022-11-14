import _providerRepository from '../data/provider.repository.js'
import { Provider } from '../models/provider.model.js'

export default class providerService {
  constructor () {
    this.providerRepository = new _providerRepository(Provider)
  }

  async getProviders (data) {
    const query = { userId: data.userId, isVisible: true }
    return this.providerRepository.getProviders(query)
  }

  async createProviders (data) {
    const newProvider = new Provider({
      ...data.body, userId: data.userId
    })
    return this.providerRepository.createProvider(newProvider)
  }

  async updateProviderVisibility (data) {
    const query = { _id: data.body._id }
    const queryToUpdateWith = { isVisible: false }
    return this.providerRepository.updateProvider(query, queryToUpdateWith)
  }

  async updateProvider (data) {
    const { _id, ...queryToUpdateWith } = data.body
    const query = { _id }
    return this.providerRepository.updateProvider(query, queryToUpdateWith)
  }

  async deleteProvider (data) {
    const query = data.body
    return this.providerRepository.deleteProvider(query)
  }
}
