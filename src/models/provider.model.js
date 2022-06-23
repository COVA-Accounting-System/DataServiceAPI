import mongoose from "mongoose"

const schema = new mongoose.Schema({
    storeName: {
        type: String,
        required: true,
        trim: true
    },
    city:{
        type: String,
        required: false,
        trim: true
    },
    country:{
        type: String,
        required: false,
        trim: true
    },
    phone:{
        type: String,
        required: false,
        trim: true
    },
    nit:{
        type: String,
        required: false,
        trim: true
    },
    address:{
        type: String,
        required: false,
        trim: true
    }
},{
    versionKey: false,
    timestamps: true
})


class provider{

}

schema.loadClass(provider);
export const Provider = mongoose.model('Provider', schema);