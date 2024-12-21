const MedicamentModel = require('../models/Medicament.model');
const { body, validationResult } = require('express-validator');

// Validators
exports.validatorCreateMedicament = [
    body('name').notEmpty().withMessage('Medicament name is required'),
    body('price').optional().isNumeric().withMessage('Price must be a number'),
    body('prescription_id').optional().isArray().withMessage('Prescription ID must be an array'),
];

exports.validatorUpdateMedicament = [
    body('name').optional().notEmpty().withMessage('Name must not be empty'),
    body('price').optional().isNumeric().withMessage('Price must be a number'),
];

// Create Medicament
exports.createMedicament = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const medicament = await MedicamentModel.create(req.body);
        res.status(201).json({ medicament });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get All Medicaments
exports.getAllMedicaments = async (req, res) => {
    try {
        const medicaments = await MedicamentModel.find();
        res.status(200).json({ medicaments });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Medicament by ID
exports.getMedicamentById = async (req, res) => {
    try {
        const medicament = await MedicamentModel.findById(req.params.id);
        if (!medicament) {
            return res.status(404).json({ message: 'Medicament not found' });
        }
        res.status(200).json({ medicament });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Medicament
exports.updateMedicament = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const medicament = await MedicamentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!medicament) {
            return res.status(404).json({ message: 'Medicament not found' });
        }
        res.status(200).json({ medicament });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete Medicament
exports.deleteMedicament = async (req, res) => {
    try {
        const medicament = await MedicamentModel.findByIdAndDelete(req.params.id);
        if (!medicament) {
            return res.status(404).json({ message: 'Medicament not found' });
        }
        res.status(200).json({ message: 'Medicament deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
