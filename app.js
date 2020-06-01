const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user')
require('dotenv').config();

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

// Passport Configuration
app.use(
    require('express-session')({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is listening on port 3000');
});
