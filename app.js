const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/user');
require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/internships', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true
	})
);

// Defining routes
app.use('/', require('./routes/index'));

// Google Strategy
app.use(passport.initialize());
passport.serializeUser((user, cb) => {
	cb(null, user.id);
});
passport.deserializeUser((id, cb) => {
	User.findById(id).then((user) => {
		cb(null, user);
	});
});
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: '/auth/google/callback'
		},
		(accessToken, refreshToken, profile, cb) => {
			// console.log(JSON.stringify(profile, null, 2));
			let user = { ...profile };
			console.log(user);
			return cb(null, profile);
		}
	)
);

app.get(
	'/auth/google',
	passport.authenticate('google', {
		scope: [ 'profile', 'email' ]
	})
);

app.get(
	'/auth/google/callback',
	passport.authenticate('google'),
	(req, res) => {
		res.redirect('/');
	}
);

app.get('/user', (req, res) => {
	console.log('getting user data!');
	res.send(user);
});

app.get('/auth/logout', (req, res) => {
	console.log('logging out!');
	user = {};
	res.redirect('/');
});

function isLoggedIn(req, res, next) {
	if (req.session.user !== undefined) {
		next();
	} else {
		res.redirect('/login');
	}
}

app.listen(process.env.PORT || 3000, () => {
	console.log('Server is listening on port 3000');
});
