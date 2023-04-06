import _configRepository from '../data/config.repository.js'
import { Config } from '../models/config.model.js'

export default class configService {
  constructor () {
    this.configRepository = new _configRepository(Config)
  }

  async getConfig (data) {
    return this.configRepository.getConfig({
      userId: data.userId
    })
  }

  async createConfig (data) {
    const newConfig = new Config({
      userId: data.userId
    })
    return this.configRepository.createConfig(newConfig)
  }
}
