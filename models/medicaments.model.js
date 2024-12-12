const mongoose=require('mongoose');
const medicamentSchema= new mongoose({
    name: { type: String, required: true },
    description: { type: String, required: true },
    composition: { type: String, required: true },
    dosage: { type: String, required: true },
    price:{type:Number,required: false, default:0},

},
    {
        timestamps:true
    })
module.exports=mongoose.model('Medicament',medicamentSchema);