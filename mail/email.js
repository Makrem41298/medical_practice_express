// Function to send a reset password email
const app = require("../app");
const { transporter } = require("../config/mail.config");

exports.sendMailForgetPassword = (email, restKey) => {
    return new Promise((resolve, reject) => {
        // Render the email template
        app.render('mail/email/forgetPassword', { layout: 'main', restKey }, (err, html) => {
            if (err) {
                console.error('Error rendering email template:', err);
                return reject({ message: 'Failed to render email template.', error: err });
            }

            // Define email options
            const mailOptions = {
                from: process.env.MAIL_APP, // Replace with your verified email
                to: email, // Replace with the recipient's email
                subject: 'Reset Your Password',
                html, // Use the rendered HTML for the email body
            };

            // Send the email
            transporter.sendMail(mailOptions)
                .then(() => resolve({ message: 'Email sent successfully!' }))
                .catch((error) => {
                    console.error('Error sending email:', error);
                    reject({ message: 'Failed to send email.', error });
                });
        });
    });
};