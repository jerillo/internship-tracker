const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	id: String,
	name: String,
	email: String,
	username: String,
	internships: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Internship'
		}
	],
	provider: String,
	dateAdded: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
