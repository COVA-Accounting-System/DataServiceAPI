import mongoose from "mongoose"


const schema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    photography:{
        type: String,
        required: false,
        trim: true
    },
    unitPrice:{
        type: String,
        required: false,
        trim: true
    },
    dozenPrice:{
        type: String,
        required: false,
        trim: true
    }
},{
    versionKey: false,
    timestamps: true
})


class product{

};

schema.loadClass(product);
export const Product = mongoose.model('Product', schema);