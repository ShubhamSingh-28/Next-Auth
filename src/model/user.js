import mongoose, { Schema } from "mongoose";


const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
    }
},{timestamps: true});

const User = mongoose.models.user || mongoose.model('user', UserSchema)

export default User;