const  mongoose=require('mongoose')
const appointmentSchema=new Mongoose.Schema({
    status: {type: String, enum: ['cancel', 'accept', 'suspend']}
},{
    timestamps:true}

)
module.exports=mongoose.model('Appointment',appointmentSchema)