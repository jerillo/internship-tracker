const router = require('express').Router();
let Internship = require('../models/internship');
let User = require('../models/user');

router.route('/:id').delete((req, res) => {
    User.findByIdAndUpdate(req.body.username,
      {pull: {'user.internships': {_id : req.params.id}}})
      .then(() => cosole.log('Internship removed from user'));
      .catch(err => res.status(400).json('Error: ' + err));

    Internship.findByIdAndDelete(req.params.id)
      .then(() => res.json('Internship deleted!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
