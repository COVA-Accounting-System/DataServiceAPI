import mongoose from "mongoose"

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
    }
    client:{

    }

})