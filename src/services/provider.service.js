import _providerRepository from "../data/provider.repository.js"

export default class providerService{
    constructor(){
        this.providerRepository = new _providerRepository();
    }

    async getProviders(){
        return this.providerRepository.getProviders();
    }

    async createProviders(data){
        return this.providerRepository.createProvider(data);
    }
}