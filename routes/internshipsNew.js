const router = require('express').Router();
let Internship = require('../models/internship');
let User = require('../models/user');

router.route('/').post((req, res) => {
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

  await newInternship.save();
  User.update({username: user.username}, {push: {internships: newInternship._id}},
    (err, doc) => {
      if (err) {
          console.log(err);
      }
          console.log(doc);
    });
});

module.exports = router;
