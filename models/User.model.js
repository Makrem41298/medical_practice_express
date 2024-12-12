const mongoose = require("mongoose");
const userSchema=new mongoose.Schema({
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    phone:{type:String,required:false},
    email: {type:String,unique:true,required:true},
    password: {type:String,unique:true,required:true},
    role:{type:String,required:true},
},
    {timestamps:true})
module.exports = mongoose.model('User', userSchema);
