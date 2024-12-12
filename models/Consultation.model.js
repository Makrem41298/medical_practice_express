const mongoose=require('mongoose')
const  consultationSchema= new mongoose(
    {
        weight:{type:Number,required:false},
        pressure:{type:Number,required:false},
        height:{type:Number,required:false},
        Diagnose: {
            name: { type: String, required: true },
            mark: { type: String, required: true },
        },
    },{
        timestamps:true

    }
)
module.exports=mongoose.model(consultationSchema,'Consultation')