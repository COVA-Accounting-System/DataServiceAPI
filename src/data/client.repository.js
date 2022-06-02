import {Client} from "../models/client.model.js"


export default class clientRepository {
    
    async getClients(){
        return Client.find();
    }

    async createClient(data){
        const newClient = new Client({
            name: data.body.name,
            lastName: data.body.lastName,
            phone: data.body.phone,
            inDebt: data.body.inDebt
        });
        return newClient.save();
    }
    
}