const router = require('express').Router();
let Internship = require('../models/internship');
let User = require('../models/user');

router.route('/:id').get((req,res) => {
    Internship.findById(req.params.id)
      .then(internship => res.json(internship))
      .catch(err => res.status(400).json('Error' + err));
});

module.exports = router;
