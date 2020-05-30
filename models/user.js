const mongoose = require('mongoose');

// TODO: Integrate Google OAuth 2.0 via Passport.js
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    internships: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Internship'
        }
    ]
});

module.exports = mongoose.model('User', UserSchema);
