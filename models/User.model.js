const mongoose = require("mongoose");
const userSchema=new mongoose.Schema({
    username:{type:String,required:true},
    phone:{type:String,required:false},
    email: {type:String,unique:true,required:true},
    password: {type:String,unique:true,required:true},
    role:{type:String,required:false},
    restKey:{type:String,required:false},
},
    {timestamps:true})
module.exports = mongoose.model('User', userSchema);
