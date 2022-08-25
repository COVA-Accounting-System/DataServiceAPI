import _clientRepository from "../data/client.repository.js"
import {Client} from "../models/client.model.js"

export default class clientService {
    constructor(){
        this.clientRepository = new _clientRepository(Client);
    }
    
    async getClients(){
        return this.clientRepository.getClients();
    }

    async getClient(data){
        return this.clientRepository.getClient(data.body);
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

    async updateClientVisibility(data){
        const query = data.body
        const queryToUpdateWith = {isVisible: false}
        return this.clientRepository.updateClient(query, queryToUpdateWith);
    }

    async deleteClient(data){
        const query = data.body
        return this.clientRepository.deleteClient(query);
    }
}