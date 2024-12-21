const mongoose=require('mongoose')
const ConsultaionModel=require('../models/Consultation.model')

const explorationSchema=new mongoose.Schema(
    {
        type:{type:String,required:true},
        mark:{type:String,required:true},
        consultation_id:{type:mongoose.Types.ObjectId,ref:ConsultaionModel,required:true},

    },{
        timestamps:true
    }
)
module.exports=mongoose.model("Exploration",explorationSchema);