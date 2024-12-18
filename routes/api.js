const authController = require('../controllers/auth.controller');
const {verifyToken,checkAbility} = require('../middlewares/middlewares');

module.exports = (app) => {
    // Routes for authentication
    app.post('/register', authController.register);
    app.post('/login', authController.login);
    app.post('/forget-password', authController.forgotPassword);
    app.post('/restore-password', authController.restorePassword);
    app.get('/user-profile',verifyToken,authController.userProfile)


};
