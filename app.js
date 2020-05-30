const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const passport = require('passport');

// Require routes
const indexRoutes = require('./routes/index');

mongoose.connect('mongodb://localhost:27017/internships', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.use(express.urlencoded({
    extended: true
}));
app.use(methodOverride('_method'));

// Routes
app.use('/', indexRoutes);

// Passport config here

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is listening on port 3000');
});