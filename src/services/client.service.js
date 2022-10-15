import _clientRepository from "../data/client.repository.js";
import { Client } from "../models/client.model.js";
import { config } from "dotenv";
import jwt from "jsonwebtoken"
config()

export default class clientService {
  constructor() {
    this.clientRepository = new _clientRepository(Client);
  }

  async getClients(data) {
    const query = { userId: data.userId, isVisible: true }
    return this.clientRepository.getClients(query);
  }

  async getClient(data) {
    return this.clientRepository.getClient(data.body);
  }

  async createClient(data) {
    const newClient = new Client({
      ...data.body, userId: data.userId
    });
    return this.clientRepository.createClient(newClient);
  }

  async updateClientVisibility(data) {
    const query = {_id: data.body._id};
    const queryToUpdateWith = { isVisible: false };
    return this.clientRepository.updateClient(query, queryToUpdateWith);
  }

  async updateClient(data){
    // const client = {...data.body};
    const {_id, ...queryToUpdateWith} = data.body;
    const query = {_id};
    return this.clientRepository.updateClient(query, queryToUpdateWith);
  }

  async deleteClient(data) {
    const query = data.body;
    return this.clientRepository.deleteClient(query);
  }
}
