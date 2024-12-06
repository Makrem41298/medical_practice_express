// Load environment variables
require('dotenv').config();

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database URL and Port
const dbUrl = process.env.DATABASE_URL;
const port = process.env.PORT || 3000;

// Connect to MongoDB
console.log(`Connecting to database: ${dbUrl}`);
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('Database connection error:', err));

// Load routes
require('./routes/api')(app);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
