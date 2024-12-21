const PaymentModel = require('../models/Payment.model');
const ConsultationModel = require('../models/Consultation.model');
const { body ,validationResult } = require('express-validator');

exports.validatorCreatePayment = [
    body('method')
        .notEmpty()
        .withMessage('Payment method is required')
        .isIn(['cash', 'credit card'])
        .withMessage('Payment method must be either "cash" or "credit card"'),

    body('status')
        .optional()
        .isIn(['pending', 'rejected', 'paid'])
        .withMessage('Status must be one of "pending", "rejected", or "paid"'),

    body('tariff')
        .notEmpty()
        .withMessage('Tariff is required')
        .isNumeric()
        .withMessage('Tariff must be a number')
        .isFloat({ min: 0 })
        .withMessage('Tariff must be at least 0'),

    body('consultation_id')
        .notEmpty()
        .withMessage('Consultation ID is required')
        .isMongoId()
        .withMessage('Invalid Consultation ID'),
];

// Validation for updating a payment
exports.validatorUpdatePayment = [
    body('method')
        .optional()
        .isIn(['cash', 'credit card'])
        .withMessage('Payment method must be either "cash" or "credit card"'),

    body('status')
        .optional()
        .isIn(['pending', 'rejected', 'paid'])
        .withMessage('Status must be one of "pending", "rejected", or "paid"'),

    body('tariff')
        .optional()
        .isNumeric()
        .withMessage('Tariff must be a number')
        .isFloat({ min: 0 })
        .withMessage('Tariff must be at least 0'),

    body('consultation_id')
        .optional()
        .isMongoId()
        .withMessage('Invalid Consultation ID'),
];

// Create Payment
exports.createPayment = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { method, status, tariff, consultation_id } = req.body;

        // Check if consultation exists
        const consultation = await ConsultationModel.findById(consultation_id);
        if (!consultation) {
            return res.status(404).json({ message: 'Consultation not found' });
        }

        // Create new payment
        const payment = new PaymentModel({
            method,
            status,
            tariff,
            consultation_id,
        });

        // Save the payment
        await payment.save();

        // Associate the payment with the consultation
        consultation.payment_id = payment._id;
        await consultation.save();

        res.status(201).json({ payment });
    } catch (err) {
        res.status(500).json({ errors: err.message });
    }
};

// Update Payment
exports.updatePayment = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const payment = await PaymentModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.status(200).json({ payment });
    } catch (err) {
        res.status(500).json({ errors: err.message });
    }
};


