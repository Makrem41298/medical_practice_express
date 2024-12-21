const authController = require('../controllers/auth.controller');
const patientController = require('../controllers/patient.controller');
const appointmentController = require('../controllers/Appointment.controller');
const {validatorCreatePatient,validatorUpdatePatient}=require('../controllers/patient.controller');
const {verifyToken,checkAbility} = require('../middlewares/middlewares');
const consultationController = require('../controllers/consultation.controller');
const explorationController = require('../controllers/exploration.controller');
const paymentController = require('../controllers/payment.controller');
const medicamentController=require('../controllers/medicament.controller')
const prescriptionController=require('../controllers/prescription.controller');


module.exports = (app) => {
    // Routes for authentication
    app.post('/register',verifyToken, checkAbility('manage','all'),authController.register);
    app.delete('/user/:id',verifyToken, checkAbility('manage','all'),authController.deleteUser);
    app.put('/user/:id', verifyToken, checkAbility('manage','all'), authController.updateUser);
    app.post('/login', authController.login);
    app.post('/forget-password', authController.forgotPassword);
    app.post('/restore-password', authController.restorePassword);
    app.get('/user-profile',verifyToken,authController.userProfile)

    //Routes for Patient
    app.post('/patient',verifyToken,validatorCreatePatient,patientController.createPatient)
    app.get('/patient', verifyToken, patientController.getAllPatients); // Get all patients
    app.get('/patient/:id', verifyToken, patientController.getPatientById); // Get patient by ID
    app.put('/patient/:id', verifyToken,validatorUpdatePatient, patientController.updatePatient); // Update patient by ID
    app.delete('/patient/:id', verifyToken, patientController.deletePatient) // Delete patient by ID
    //Route appointment

    app.post('/appointment', verifyToken, appointmentController.validatorCreateAppointment, appointmentController.createAppointment);
    app.get('/appointment', verifyToken, appointmentController.getAllAppointments);
    app.get('/appointment/:id', verifyToken, appointmentController.getAppointmentById);
    app.put('/appointment/:id', verifyToken, appointmentController.validatorUpdateAppointment, appointmentController.updateAppointment);
    app.delete('/appointment/:id', verifyToken, appointmentController.deleteAppointment);
    //Route consultation
    app.post('/consultation', verifyToken, checkAbility('manage','all'),consultationController.validatorCreateConsultation, consultationController.createConsultation);
    app.get('/consultation', verifyToken,checkAbility('manage','all'), consultationController.getAllConsultations);
    app.get('/consultation/:id', verifyToken, checkAbility('manage','all'),consultationController.getConsultationById);
    app.put('/consultation/:id', verifyToken, checkAbility('manage','all'),consultationController.validatorUpdateConsultation, consultationController.updateConsultation);
    app.delete('/consultation/:id', verifyToken,checkAbility('manage','all'), consultationController.deleteConsultation);
    //Rout Exploration
    app.post('/exploration',verifyToken,checkAbility('manage','all'),explorationController.validatorCreateExploration, explorationController.createExploration);
    app.get('/explorations',verifyToken,checkAbility('manage','all'), explorationController.getAllExplorations);
    app.get('/exploration/:id',verifyToken,checkAbility('manage','all'), explorationController.getExplorationById);
    app.put('/exploration/:id',verifyToken,checkAbility('manage','all'),explorationController.validatorUpdateExploration, explorationController.updateExploration);
    app.delete('/exploration/:id',verifyToken, checkAbility('manage','all'),explorationController.deleteExploration);

// Routes for Payment
    app.post('/payment', verifyToken,checkAbility('manage','all'), paymentController.validatorCreatePayment, paymentController.createPayment);
    app.put('/payment/:id', verifyToken,checkAbility('manage','all'), paymentController.validatorUpdatePayment, paymentController.updatePayment);
//Route for medicament
    app.post('/medicaments', verifyToken,checkAbility('manage','all'),medicamentController.validatorCreateMedicament,medicamentController.createMedicament);
    app.put('/medicaments/:id',verifyToken,checkAbility('manage','all'), medicamentController.validatorUpdateMedicament, medicamentController.updateMedicament);
    app.get('/medicaments',verifyToken,checkAbility('manage','all'), medicamentController.getAllMedicaments);
    app.get('/medicaments/:id',verifyToken,checkAbility('manage','all'), medicamentController.getMedicamentById);
    app.delete('/medicaments/:id',verifyToken,checkAbility('manage','all'), medicamentController.deleteMedicament);
    //Routes for prescription
    app.post('/prescriptions', verifyToken,checkAbility('manage','all'), prescriptionController.validatorCreatePrescription, prescriptionController.createPrescription);
    app.put('/prescriptions/:id',verifyToken,checkAbility('manage','all'), prescriptionController.validatorUpdatePrescription, prescriptionController.updatePrescription);
    app.get('/prescriptions', verifyToken,checkAbility('manage','all'), prescriptionController.getAllPrescriptions);
    app.get('/prescriptions/:id', verifyToken, checkAbility('manage','all'),prescriptionController.getPrescriptionById);
    app.delete('/prescriptions/:id', verifyToken,checkAbility('manage','all'), prescriptionController.deletePrescription);


};
