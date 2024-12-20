const mongoose=require('mongoose')
const MedicamentModel=require('../models/Medicament.model')
const ConsultationModel=require('../models/Consultation.model')
const prescriptionSchema= new mongoose.Schema({
    mark:{type:String,required: true},
    consultation_id:{type:mongoose.Types.ObjectId,ref:ConsultationModel,required:true},
    medicament_id:[{type:mongoose.Types.ObjectId,ref:'Medicament'}],

},{
    timestamps:true
})
module.exports=mongoose.model('Prescription',prescriptionSchema)