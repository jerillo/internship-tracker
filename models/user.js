const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// TODO: Integrate Google OAuth 2.0 via Passport.js

const UserSchema = new mongoose.Schema({
	id: String,
	name: String,
	email: String,
	internships: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Internship'
		}
	],
	provider: String,
	dateAdded: { type: Date, default: Date.now }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
