const router = require('express').Router()
let Internship = require('../models/internship')
let User = require('../models/user')

router.route('/new').post((req, res) => {
  const company = req.body.company;
  const position = req.body.position;
  const status = req.body.status;
  const dateApplied = Date.parse(req.body.dateApplied);
  const primaryContact = req.body.primaryContact;
  const user = User.find({username: req.body.username}, (err, data) => {
      if (err) {
        res.json('Error: ' + err);
        return;
      }
      return data[0];
  });

  const newInternship = new Internship({
    company,
    position,
    status,
    dateApplied,
    primaryContact,
    user,
  });

  newInternship.save()
    .then(() => {res.json('New Internship Added!')})
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
