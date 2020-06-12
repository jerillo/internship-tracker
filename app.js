const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
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
app.use('/auth', require('./routes/auth'));

app.listen(process.env.PORT || 3000, () => {
	console.log('Server is listening on port 3000');
});
