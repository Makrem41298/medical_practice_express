const PrescriptionModel = require('../models/Prescription.model');
const ConsultationModel = require('../models/Consultation.model');
const MedicamentModel=require('../models/Medicament.model');
const { body, validationResult } = require('express-validator');

// Validation middleware
exports.validatorCreatePrescription = [
    body('mark').notEmpty().withMessage('Mark is required'),
    body('consultation_id').notEmpty().isMongoId().withMessage('Consultation ID is required'),
    body('medicament_id').notEmpty().optional().isMongoId().withMessage('Medicament ID is not be empty')
];

exports.validatorUpdatePrescription= [
    body('mark').optional().notEmpty().withMessage('Name must not be empty'),
];

// Create Prescription
exports.createPrescription = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { mark, consultation_id, medicament_id } = req.body;

    try {
        // Validate Consultation
        const consultation = await ConsultationModel.findById(consultation_id);
        if (!consultation) {
            return res.status(404).json({ message: `Consultation not found` });
        }

        for (const medicament of medicament_id) {
            const medicament_vef = await MedicamentModel.findById(medicament);
            if (!medicament_vef) {
                return res.status(404).json({ message: `Medicament with ID not found` });
            }
        }

        const prescription = new PrescriptionModel({
            mark,
            consultation_id,
             medicament_id,
        });
        await prescription.save();

        // Link Prescription to Consultation
        consultation.prescription_id.push(prescription.id);
        await consultation.save();

        res.status(201).json({ message: 'Prescription created successfully', prescription });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all Prescriptions
exports.getAllPrescriptions = async (req, res) => {
    try {
        const prescriptions = await PrescriptionModel.find().populate('medicament_id');
        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getPrescriptionById=async (req, res) => {
    try {
        const prescriptions=await PrescriptionModel.findById(req.params.id)
        res.status(200).json(prescriptions);
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update Prescription
exports.updatePrescription = async (req, res) => {
    const { mark, consultation_id, medicament_id } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.params.id)
    const prescription = await PrescriptionModel.findById(req.params.id);
    if (!prescription) {
        return res.status(404).json({ message: 'Prescription not found' });
    }

    try {


        // Update the prescription
        const updatedPrescription = await PrescriptionModel.findByIdAndUpdate(
            req.params.id,
            {
                mark,
                consultation_id,
               medicament_id, // Correct field name
            },
            { new: true }
        );

        res.status(200).json({ message: 'Prescription updated successfully', prescription: updatedPrescription });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Prescription
exports.deletePrescription = async (req, res) => {

    try {
        const prescription = await PrescriptionModel.findByIdAndDelete(req.params.id);
        if (!prescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }

        res.status(200).json({ message: 'Prescription deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
