const mongoose=require('mongoose');
const PrescriptionModel=require('../models/Prescription.model');
const medicamentSchema= new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false,default:'' },
    composition: { type: String, required: false ,default:''},
    dosage: { type: String, required: false ,default:''},
    price:{type:Number,required: false, default:0},
    company:{type:String,required: false, default:''},
    prescription_id:[{type:mongoose.Types.ObjectId,ref:PrescriptionModel}]

},
    {
        timestamps:true
    })
module.exports=mongoose.model('Medicament',medicamentSchema);