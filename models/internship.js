const mongoose = require('mongoose');

const InternshipSchema = new mongoose.Schema({
    company: String,
    position: String,
    status: String,
    dateApplied: { type: Date, default: Date.now },
    primaryContact: String,
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    }
})

module.exports = mongoose.model('Internship', InternshipSchema)
