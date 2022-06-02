import mongoose from "mongoose"

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    product:{
        type: String,
        required: false,
        trim: true
    },
    phone:{
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