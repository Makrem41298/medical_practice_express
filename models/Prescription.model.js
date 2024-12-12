const mongoose=require('mongoose')
const prescriptionSchema= new mongoose({
    mark:{type:String,required: true},
},{
    timestamps:true
})
module.exports=mongoose.model('Prescription',prescriptionSchema)