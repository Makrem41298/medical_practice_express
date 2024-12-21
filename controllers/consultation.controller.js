const { body, validationResult } = require('express-validator');
const AppointmentModel = require('../models/Appointment.model');

exports.validatorCreateConsultation = [
    body('Diagnose.name').notEmpty().withMessage('Diagnosis name is required'),
    body('Diagnose.mark').notEmpty().withMessage('Diagnosis mark is required'),
    body('appointments').notEmpty().withMessage('Appointment ID is required'),
];

exports.validatorUpdateConsultation = [
    body('Diagnose.name').optional().notEmpty().withMessage('Diagnosis name must be provided if updating'),
    body('Diagnose.mark').optional().notEmpty().withMessage('Diagnosis mark must be provided if updating'),
    body('appointments').optional().notEmpty().withMessage('Appointment ID must be valid if provided'),
];

// Create consultation

exports.createConsultation = async (req, res) => {
    try {
        const { appointments, weight, pressure, height, Diagnose } = req.body;

        // Check if the appointment exists
        const appointment = await AppointmentModel.findById(appointments);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        const consultation = await ConsultationModel.create({
            weight,
            pressure,
            height,
            Diagnose,
            appointments,
        });
        appointment.consultation_id = consultation._id;
        await appointment.save();

        res.status(201).json({ consultation });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all consultations
exports.getAllConsultations = async (req, res) => {
    try {
        const consultations = await ConsultationModel.find().populate('appointments').populate('exploration_id').populate('payment_id').populate('prescription_id')
        res.status(200).json({ consultations });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get consultation by ID
exports.getConsultationById = async (req, res) => {
    try {
        const consultation = await ConsultationModel.findById(req.params.id).populate('appointments');
        if (!consultation) {
            return res.status(404).json({ message: 'Consultation not found' });
        }
        res.status(200).json({ consultation });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update consultation by ID
exports.updateConsultation = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const consultation = await ConsultationModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!consultation) {
            return res.status(404).json({ message: 'Consultation not found' });
        }
        res.status(200).json({ consultation });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete consultation by ID
const ConsultationModel = require('../models/Consultation.model');
const PrescriptionModel = require('../models/Prescription.model');
const ExplorationModel = require('../models/Exploration.model');
const PaymentModel = require('../models/Payment.model');

exports.deleteConsultation = async (req, res) => {
    const consultationId  = req.params.id;

    try {
        // Find the consultation
        const consultation = await ConsultationModel.findById(consultationId);
        if (!consultation) {
            return res.status(404).json({ message: 'Consultation not found' });
        }
        if (consultation.prescription_id && consultation.prescription_id.length > 0) {
            await PrescriptionModel.deleteMany({ _id: { $in: consultation.prescription_id } });
        }
        if (consultation.exploration_id && consultation.exploration_id.length > 0) {
            await ExplorationModel.deleteMany({ _id: { $in: consultation.exploration_id } });
        }
        if (consultation.payment_id) {
            await PaymentModel.findByIdAndDelete(consultation.payment_id);
        }

        // Delete the consultation
        await ConsultationModel.findByIdAndDelete(consultationId);

        res.status(200).json({ message: 'Consultation and related data deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

