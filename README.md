# Medical Practice Express API

A RESTful API built with **Node.js**, **Express**, and **MongoDB** for managing a medical practice. This application handles patients, appointments, medical consultations, prescriptions, payments, and user authentication with role-based access control.

## Features

* **User Authentication**: Secure login, registration, and password reset flows using JWT and email notifications.
* **Role-Based Access Control (RBAC)**: Authorization using CASL (eQP `Doctor` vs `Secretary` permissions).
* **Patient Management**: CRUD operations for patient records.
* **Appointment Scheduling**: Manage patient appointments and statuses (accept, cancel, suspend).
* **Medical Consultations**: Record diagnoses, vitals (weight, pressure), and link them to appointments.
* **Prescriptions & Medicaments**: Manage medications and generate prescriptions linked to consultations.
* **Explorations**: Track medical explorations/tests.
* **Payments**: specific payment tracking for consultations.
* **Email Notifications**: Integration with Mailgun for password resets.

## Tech Stack

* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: MongoDB (via Mongoose)
* **Authentication**: JSON Web Token (JWT) & bcryptjs
* **Email**: Nodemailer & Mailgun
* **Validation**: express-validator
* **Templating**: Handlebars (hbs) for email templates

## Prerequisites

Ensure you have the following installed:
* [Node.js](httpskh://nodejs.org/) (v14+ recommended)
* [MongoDB](https://www.mongodb.com/) (running locally or via Atlas)

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd medical_practice_express
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add the following configuration:

    ```env
    PORT=3000
    DATABASE_URL=mongodb://localhost:27017/mini-projet
    JWT_SECRET=your_super_secret_key
    MAIL_APP=your_verified_sender_email@example.com
    MAILGUN_API_KEY=your_mailgun_api_key
    MAILGUN_DOMAIN=your_mailgun_domain
    ```

## Running the Application

* **Development Mode** (uses nodemon for hot-reloading):
    ```bash
    npm run dev
    ```

* **Production Mode**:
    ```bash
    npm start
    ```

The server will start on `http://localhost:3000` (or the port specified in your `.env`).

## API Endpoints

### Authentication
* `POST /login` - Authenticate user and receive token.
* `POST /register` - Register a new user (Protected).
* `POST /forget-password` - Request a password reset email.
* `POST /restore-password` - Reset password using the token received via email.
* `GET /user-profile` - Get current user profile.
* `PUT /user/:id` - Update user details.
* `DELETE /user/:id` - Delete a user.

### Patients
* `POST /patient` - Create a new patient.
* `GET /patient` - List all patients.
* `GET /patient/:id` - Get specific patient details.
* `PUT /patient/:id` - Update patient details.
* `DELETE /patient/:id` - Delete a patient.

### Appointments
* `POST /appointment` - Schedule a new appointment.
* `GET /appointment` - List all appointments.
* `GET /appointment/:id` - Get appointment details.
* `PUT /appointment/:id` - Update appointment (e.g., change status).
* `DELETE /appointment/:id` - Cancel/Delete an appointment.

### Consultations (Restricted Access)
* `POST /consultation` - Create a medical consultation record.
* `GET /consultation` - List all consultations.
* `GET /consultation/:id` - Get consultation details.
* `PUT /consultation/:id` - Update consultation.
* `DELETE /consultation/:id` - Delete consultation.

### Prescriptions & Medicaments (Restricted Access)
* `POST /prescriptions` - Create a prescription.
* `GET /prescriptions` - List all prescriptions.
* `POST /medicaments` - Add a new medicament.
* `GET /medicaments` - List available medicaments.

### Explorations (Restricted Access)
* `POST /exploration` - Record a medical exploration type/mark.
* `GET /explorations` - List explorations.

### Payments (Restricted Access)
* `POST /payment` - Record a payment.
* `PUT /payment/:id` - Update payment status.

