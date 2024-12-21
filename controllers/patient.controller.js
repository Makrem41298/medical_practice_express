const PatientModel = require('../models/Patient.model');
const { body, validationResult } = require('express-validator');

// Validators for Patient
exports.validatorCreatePatient = [
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
    body('date_of_birth').notEmpty().isDate().withMessage('Date of birth is required and must be valid'),
    body('gender').notEmpty().isIn(['male', 'female']).withMessage('Gender must be male or female'),
    body('family_situation')
        .notEmpty()
        .isIn(['married', 'single'])
        .withMessage('Family situation must be married or single'),
    body('appointments').optional().isArray().withMessage('Appointments must be an array'),
];

exports.validatorUpdatePatient = [
    body('first_name').optional().notEmpty().withMessage('First name must be provided if updating'),
    body('last_name').optional().notEmpty().withMessage('Last name must be provided if updating'),
    body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
    body('date_of_birth').optional().isDate().withMessage('Invalid date of birth'),
    body('gender').optional().isIn(['male', 'female']).withMessage('Gender must be male or female'),
    body('family_situation')
        .optional()
        .isIn(['married', 'single'])
        .withMessage('Family situation must be married or single'),
    body('appointments').optional().isArray().withMessage('Appointments must be an array'),
];

// Create Patient
exports.createPatient = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const patient = await PatientModel.create(req.body);
        res.status(201).json({ patient });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get All Patients
exports.getAllPatients = async (req, res) => {
    try {
        const patients = await PatientModel.find().populate('appointments');
        res.status(200).json({ patients });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Patient By ID
exports.getPatientById = async (req, res) => {
    try {
        const patient = await PatientModel.findById(req.params.id).populate('appointments');
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json({ patient });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Patient
exports.updatePatient = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const patient = await PatientModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json({ patient });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete Patient
exports.deletePatient = async (req, res) => {
    try {
        const patient = await PatientModel.findByIdAndDelete(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
