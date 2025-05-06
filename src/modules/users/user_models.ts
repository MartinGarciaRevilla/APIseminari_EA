import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => new mongoose.Types.ObjectId().toString()
    },
    name :{
        type: String,
        required : true
    },
    age: {
        type: Number,
        required : true
    },
    email: {
        type : String,
        required : true,
        unique : true
    },
    password: {
        type : String,
        required : true
    }
});

export interface IUser{
    _id?: string;
    name : string;
    age : number;
    email : string;
    password: string;

}

const User = mongoose.model('User', userSchema);
export default User;