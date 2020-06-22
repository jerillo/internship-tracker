const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/user');
require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/internships', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
app.use(express.json());
app.use(cors());
app.use(
	express.urlencoded({
		extended: true
	})
);

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

// Google Strategy
passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: '/auth/google/callback'
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleId: profile.id }, (err, user) => {
				if (err) {
					return done(err);
				}
				if (!user) {
					user = new User({
						googleId: profile.id,
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

// Pass currentUser as param
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});

// Auth routes
app.get(
	'/auth/google',
	passport.authenticate('google', {
		scope: [ 'profile', 'email' ]
	})
);

app.get(
	'/auth/google/callback',
	passport.authenticate('google', {
		successRedirect: '/',
		failureRedirect: '/auth/google'
	}),
	(req, res) => {
		res.redirect('/');
	}
);

// Defining routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/internship/new', require('./routes/internshipsNew'));
app.use('/internship/delete', require('./routes/internshipDelete'));
app.use('/internship/update', require('./routes/internshipUpdate'));
app.use('/internship', require('./routes/internshipFind'));

app.listen(process.env.PORT || 3000, () => {
	console.log('Server is listening on port 3000');
});
