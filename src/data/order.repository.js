
export default class orderRepository{
    constructor(Order){
        this.Order = Order;
    }
    async getOrders(){
        return this.Order.find();
    }
    async createOrders(newOrder){
        return newOrder.save();
    }
}