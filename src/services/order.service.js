import {Order} from "../models/order.model.js"
import _orderRepository from "../data/order.repository.js"

export default class orderService{
    constructor(){
        this.orderRepository = new _orderRepository(Order);
    }
    async createOrder(data){
        const newOrder = new Order({
            client: data.body.client,
            statusCounter: data.body.statusCounter}) ;
        return this.orderRepository.createOrders(newOrder);
    }
    async getOrders(){
        return this.orderRepository.getOrders();
    }
}