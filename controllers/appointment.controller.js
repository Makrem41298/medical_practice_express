const AppointmentModel = require('../models/Appointment.model');
const PatientModel = require('../models/Patient.model');
const { body, validationResult } = require('express-validator');

// Validators for Appointments
exports.validatorCreateAppointment = [
    body('date').notEmpty().isISO8601().withMessage('Date is required and must be valid'),
    body('status')
        .notEmpty()
        .isIn(['cancel', 'accept', 'suspend'])
        .withMessage('Status must be one of: cancel, accept, suspend'),
    body('patient_id').notEmpty().withMessage('Patient ID is required').isMongoId().withMessage('Invalid Patient ID'),
];

exports.validatorUpdateAppointment = [
    body('date').optional().isISO8601().withMessage('Invalid date'),
    body('status')
        .optional()
        .isIn(['cancel', 'accept', 'suspend'])
        .withMessage('Status must be one of: cancel, accept, suspend'),
    body('patient_id').optional().isMongoId().withMessage('Invalid Patient ID'),
];

// Create Appointment
exports.createAppointment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { date, status, patient_id } = req.body;

        // Check if patient exists
        const patient = await PatientModel.findById(patient_id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Create appointment
        const appointment = await AppointmentModel.create({ date, status, patient_id });

        // Add appointment to patient's appointments array
        patient.appointments.push(appointment._id);
        await patient.save();

        res.status(201).json({ appointment });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get All Appointments
exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await AppointmentModel.find().populate('patient_id', 'first_name last_name');
        res.status(200).json({ appointments });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Appointment By ID
exports.getAppointmentById = async (req, res) => {
    try {
        const appointment = await AppointmentModel.findById(req.params.id).populate('patient_id', 'first_name last_name');
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json({ appointment });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Appointment
exports.updateAppointment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const appointment = await AppointmentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json({ appointment });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete Appointment
exports.deleteAppointment = async (req, res) => {
    try {
        const appointment = await AppointmentModel.findByIdAndDelete(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Remove appointment from the patient's appointments array
        await PatientModel.updateOne(
            { _id: appointment.patient_id },
            { $pull: { appointments: appointment._id } }
        );

        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
