const mongoose=require('mongoose')
const AppointmentModel=require('../models/Appointment.model')
const userSchema=new mongoose.Schema({

    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    phone:{type:String,required:false},
    date_of_birth:{type:Date,required:true},
    gender:{type:String,required:true,enum:["male","female"]},
        family_situation:{type:String,required:true,enum:['married','single']},
    appointments:[{type:mongoose.Types.ObjectId,ref:'Appointment'}],

},
{
    timestamps:true
})
module.exports =mongoose.model('Patient',userSchema);
