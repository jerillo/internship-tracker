const router = require('express').Router();
let Internship = require('../models/internship');

router.route('/:id').delete((req, res) => {
    Internship.findByIdAndDelete(req.params.id)
      .then(() => res.json('Internship deleted!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
