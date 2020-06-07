const router = require('express').Router();
let Internship = require('../models/internship');
let User = require('../models/user');

router.route('/').post((req, res) => {
  const company = req.body.company;
  const position = req.body.position;
  const status = req.body.status;
  const dateApplied = Date.parse(req.body.dateApplied);
  const primaryContact = req.body.primaryContact;
  User.find({username: req.body.username})
    .then((user) => {
        const newInternship = new Internship({
          company,
          position,
          status,
          dateApplied,
          primaryContact,
          user
        });
        newInternship.save()
          .then(() => res.json('New internship saved!'))
          .catch(err => res.status(400).json('Error: ' + err));
        User.update({username: user.username}, {$push: {internships: newInternship._id}})
          .then(() => res.json('Internship successfully saved with user!'))
          .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
