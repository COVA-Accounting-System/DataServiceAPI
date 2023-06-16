export default class configRepository {
  constructor (Config) {
    this.Config = Config
  }

  async getConfig (query) {
    return this.Config.findOne(query)
  }

  async createConfig (newConfig) {
    return newConfig.save()
  }

  async updateConfig (query, queryToUpdateWith) {
    await this.Config.findOneAndUpdate(query, queryToUpdateWith)
    return this.getConfig(query)
  }
}
