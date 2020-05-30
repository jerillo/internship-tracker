const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
require('dotenv').config()

// Require routes
const indexRoutes = require('./routes/index');

mongoose.connect('mongodb://localhost:27017/internships', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));

// Routes
app.use('/', indexRoutes);

// Passport config here

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is listening on port 3000');
});