const ExplorationModel = require('../models/Exploration.model');
const ConsultationModel = require('../models/Consultation.model');
const { body, validationResult } = require('express-validator');

// Validators
exports.validatorCreateExploration = [
    body('type').notEmpty().withMessage('Type is required'),
    body('mark').notEmpty().withMessage('Mark is required'),
    body('consultation_id').notEmpty().withMessage('Consultation ID is required'),
];

exports.validatorUpdateExploration = [
    body('type').optional().notEmpty().withMessage('Type must be provided if updating'),
    body('mark').optional().notEmpty().withMessage('Mark must be provided if updating'),
    body('consultation_id').optional().notEmpty().withMessage('Consultation ID must be valid if provided'),
];

// Create exploration
exports.createExploration = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { type, mark, consultation_id } = req.body;

        // Check if consultation exists
        const consultation = await ConsultationModel.findById(consultation_id);
        if (!consultation) {
            return res.status(404).json({ message: 'Consultation not found' });
        }

        // Create exploration
        const exploration = await ExplorationModel.create({ type, mark, consultation_id });

        // Link exploration to consultation
        consultation.exploration_id.push(exploration._id);
        await consultation.save();

        res.status(201).json({ exploration });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all explorations
exports.getAllExplorations = async (req, res) => {
    try {
        const explorations = await ExplorationModel.find();
        res.status(200).json({ explorations });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get exploration by ID
exports.getExplorationById = async (req, res) => {
    try {
        const exploration = await ExplorationModel.findById(req.params.id);
        if (!exploration) {
            return res.status(404).json({ message: 'Exploration not found' });
        }
        res.status(200).json({ exploration });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update exploration by ID
exports.updateExploration = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const exploration = await ExplorationModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!exploration) {
            return res.status(404).json({ message: 'Exploration not found' });
        }
        res.status(200).json({ exploration });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete exploration by ID
exports.deleteExploration = async (req, res) => {
    try {
        const exploration = await ExplorationModel.findByIdAndDelete(req.params.id);
        if (!exploration) {
            return res.status(404).json({ message: 'Exploration not found' });
        }

        // Remove exploration reference from the consultation
        await ConsultationModel.findByIdAndUpdate(
            exploration.consultation_id,
            { $pull: { exploration_id: exploration._id } },
            { new: true }
        );

        res.status(200).json({ message: 'Exploration deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
