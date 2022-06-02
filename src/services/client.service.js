import _clientRepository from "../data/client.repository.js"


export default class clientService {
    constructor(){
        this.clientRepository = new _clientRepository();
    }
    
    async getClients(){
        return this.clientRepository.getClients();
    }

    async createClient(data){
        return this.clientRepository.createClient(data);
    }
}