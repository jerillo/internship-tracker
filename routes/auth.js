const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

// Google Strategy
router.use(passport.initialize());
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
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ id: profile.id }, (err, user) => {
				if (err) {
					return done(err);
				}
				if (!user) {
					user = new User({
						id: profile.id,
						name: profile.displayName,
						email: profile.emails[0].value,
						username: profile.emails[0].value,
						provider: 'google'
					});
					user.save((err) => {
						if (err) {
							console.error(err);
						}
						return done(err, user);
					});
				} else {
					return done(err, user);
				}
			});
		}
	)
);

router.get(
	'/google',
	passport.authenticate('google', {
		scope: [ 'profile', 'email' ]
	})
);

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
	res.redirect('/');
});

router.get('/logout', (req, res) => {
	console.log('logging out!');
	user = {};
	res.redirect('/');
});

module.exports = router;
