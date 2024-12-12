const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({

    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    phone:{type:String,required:false},
    date_of_birth:{type:Date,required:true},
    family_situation:{type:String,required:true}


},
{
    timestamps:true
})
module.exports =mongoose.model('Patient',userSchema);
