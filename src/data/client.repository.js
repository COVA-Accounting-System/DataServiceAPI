


export default class clientRepository {
    constructor(Client){
        this.Client = Client;
    }
    async getClients(){
        return this.Client.find();
    }

    async createClient(newClient){

        return newClient.save();
    }
    
}