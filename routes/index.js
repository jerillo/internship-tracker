const express = require('express');
const router = express.Router();
let Internship = require('../models/internship');

router.get('/', (req, res) => {
	Internship.find({})
		.then(internship => res.send(internship))
		.catch(err => res.status(400).json(err));
});

module.exports = router;
