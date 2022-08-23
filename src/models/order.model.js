import mongoose  from "mongoose"
import {Client} from "../models/client.model.js"
import {production_stage} from "../enums/production_stage.js"

const schema = new mongoose.Schema({
    creationDate:{
        type: Date,
        required: true,
        default: Date.now,
        trim: true
    },
    productionDate:{
        type: Date,
        required: false,
        trim: true
    },
    completionDate:{
        type: Date,
        required: false,
        trim: true
    },
    soldDate:{
        type: Date,
        required: false,
        trim: true
    },
    client:{
        type: Object,
        required: true,
    },
    state:{
        type: String,
        required: true
    }
},{
    versionKey: false,
    timestamps: true
});


 class order{
    constructor(Client){
        this.client = Client;
        this.stateCounter = 0;
        this.state = production_stage[stateCounter];
    }
    moveForward(){
        if(this.state != production_stage[production_stage.length() - 1] ){
            this.stateCounter++;
            this.state = production_stage[this.stateCounter];
        }
    }
    moveBackward(){
        if(this.state != production_stage[0]){
            this.stateCounter--;
            this.state = production_stage[this.stateCounter];
        }
    }
}

schema.loadClass(order);
export const Order = mongoose.model('Order', schema);