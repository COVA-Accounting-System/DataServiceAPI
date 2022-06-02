import mongoose from "mongoose"

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
    ci:{
        type: String,
        required: false,
        trim: true
    },
    salary:{
        type: String,
        required: false,
        trim: true
    }
},{
    versionKey: false,
    timestamps: true
});


class employee{

}

schema.loadClass(employee);
export const Employee = mongoose.model('Employee', schema);



