import mongoose from "mongoose"

const schema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    lastName:{
        type: String,
        required: true,
        trim: true
    },
    phone:{
        type: String,
        required: false,
        trim: true
    },
    ci:{
        type: String,
        required: true,
        trim: true
    },
    startDate:{
        type: String,
        required: false,
        trim: true
    },
    nationality:{
        type: String,
        required: false,
        trim: true
    },
    dateOfBirth:{
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



