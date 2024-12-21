const mongoose = require('mongoose');
const AppointmentModel = require('../models/Appointment.model');

const consultationSchema = new mongoose.Schema(
    {
        weight: { type: Number, required: false },
        pressure: { type: Number, required: false },
        height: { type: Number, required: false },
        Diagnose: {
            name: { type: String, required: true },
            mark: { type: String, required: true },
        },
        appointments: { type: mongoose.Types.ObjectId, ref: 'Appointment', required: true },
        exploration_id:[{type:mongoose.Types.ObjectId,ref:'Exploration'}],
        payment_id:{type:mongoose.Types.ObjectId,ref:'Payment'},
        prescription_id:[{type:mongoose.Types.ObjectId,ref:'Prescription'}]

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Consultation', consultationSchema);
