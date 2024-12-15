const mongoose=require('mongoose')
const ConsltationModel=require('../models/Consultation.model')
const paymentSchema=new mongoose.Schema(
    {
        method: {type: String, required: true},
        status:{type:String,enum:['pending','rejected','paid'],default: 'pending'},
        tariff:{type:Number,required: true,default:0},
        consultation_id:{type:mongoose.Types.ObjectId,ref:ConsltationModel,required:true},
        date:{type:Date,default:Date.now},



    },{
        timestamps:true
    })
module.exports=mongoose.model('Payment',paymentSchema);