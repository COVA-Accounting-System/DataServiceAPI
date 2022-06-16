import {Provider} from "../models/provider.model.js"

export default class providerRepository{
    
    async getProviders(){
        return Provider.find();
    }

    async createProvider(data){
        const newProvider = new Provider({
            name: data.body.name,
            product: data.body.product,
            phone: data.body.phone
        });
        return newProvider.save();
    }
}