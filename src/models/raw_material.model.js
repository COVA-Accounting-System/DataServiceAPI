import mongoose from "mongoose"

const schema = new mongoose.Schema({
    name:{
        required: true,
        type: String,
        trim: true
    },
    amount:{
        type: String,
        required: true,
        trim: true
    },
    unit:{
        type: String,
        required: true,
        trim: true
    },
    isVisible: {
        type: Boolean,
        default: true,
        required: true
    }
},{
    versionKey: false,
    timestamps: true
})


class rawMaterial{

}

schema.loadClass(rawMaterial);
export const RawMaterial = mongoose.model('RawMaterial', schema);