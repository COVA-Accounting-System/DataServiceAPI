


export default class clientRepository {
    constructor(Client){
        this.Client = Client;
    }
    async getClients(){
        return this.Client.find();
    }

    async getClient(query){
        return this.Client.findOne(query);
    }

    async createClient(newClient){

        return newClient.save();
    }
    
   async updateClient(query, queryToUpdateWith){
       await this.Client.findOneAndUpdate(query, queryToUpdateWith)
       return this.getClient(query);
   }

   async deleteClient(query){
        await this.Client.findOneAndDelete(query);
        return `This client was deleted`;
   }
}