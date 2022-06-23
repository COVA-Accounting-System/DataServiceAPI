import _providerRepository from "../data/provider.repository.js"
import {Provider} from "../models/provider.model.js"


export default class providerService{
    constructor(){
        this.providerRepository = new _providerRepository(Provider);
    }

    async getProviders(){
        return this.providerRepository.getProviders();
    }

    async createProviders(data){
        const newProvider = new Provider({
            storeName: data.body.storeName,
            city: data.body.city,
            country: data.body.country,
            phone: data.body.phone,
            nit: data.body.nit,
            address: data.body.address
        });
        return this.providerRepository.createProvider(newProvider);
    }
}