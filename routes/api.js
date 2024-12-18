const authController = require('../controllers/auth.controller');
const transporter = require('../config/mail.config').transporter; // Assuming mail.config.js exports the transporter

module.exports = (app) => {
    // Routes for authentication
    app.post('/register', authController.register);
    app.post('/login', authController.login);
    app.post('/forget-password', authController.forgotPassword);
    app.post('/restore-password', authController.restorePassword);



};
