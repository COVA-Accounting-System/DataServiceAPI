import _clientRepository from "../data/client.repository.js"
import {Client} from "../models/client.model.js"

export default class clientService {
    constructor(){
        this.clientRepository = new _clientRepository(Client);
    }
    
    async getClients(){
        return this.clientRepository.getClients();
    }

    async createClient(data){
        const newClient = new Client({
            name: data.body.name,
            lastName: data.body.lastName,
            phone: data.body.phone,
            inDebt: data.body.inDebt
        });
        return this.clientRepository.createClient(newClient);
    }
}