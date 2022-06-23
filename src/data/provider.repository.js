

export default class providerRepository{
    constructor(Provider){
        this.Provider = Provider;
    }

    async getProviders(){
        return this.Provider.find();
    }

    async createProvider(newProvider){
        return newProvider.save();
    }
}