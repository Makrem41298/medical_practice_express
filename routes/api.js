const authController = require('../controllers/auth.controller');
const configEmail=require('../config/mail.config.js')
module.exports=(app)=>{
    app.post('/register',authController.register);
    app.post('/login',authController.login);
}
