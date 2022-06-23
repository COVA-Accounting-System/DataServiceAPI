import mongoose from "mongoose";


const schema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    lastName:{
        type: String,
        required: false,
        trim: true
    },
    phone:{
        type: String,
        required: false,
        trim: true
    },
    inDebt:{
        type: String,
        required: true,
        trim: true
    }
},{
    versionKey: false,
    timestamps: true
});


class client {

}


schema.loadClass(client)
export const Client = mongoose.model('Client', schema);