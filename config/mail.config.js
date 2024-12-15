require('dotenv').config();
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const mailgunAuth = {
    auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN,
    },
};
exports.transporter = nodemailer.createTransport(mg(mailgunAuth));
