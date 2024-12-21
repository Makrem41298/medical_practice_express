const  mongoose=require('mongoose')
const PatientModel=require('./Patient.model')

const appointmentSchema=new mongoose.Schema({
    status: {type: String, enum: ['cancel', 'accept', 'suspend']},
    date:{type:Date,required:true},
    patient_id:{type:mongoose.Types.ObjectId,ref:'Patient',required:true},
    consultation_id:{type:mongoose.Types.ObjectId,ref:'Consultation'},

},{
    timestamps:true}

)
module.exports=mongoose.model('Appointment',appointmentSchema)