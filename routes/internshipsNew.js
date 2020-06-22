const router = require('express').Router();
let Internship = require('../models/internship');
let User = require('../models/user');

router.route('/').post((req, res) => {
  const company = req.body.company;
  const position = req.body.position;
  const status = req.body.status;
  const dateApplied = Date.parse(req.body.dateApplied);
  const primaryContact = req.body.primaryContact;
  User.findOne({username: req.body.username})
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
          .then(() => {
            User.findOneAndUpdate({_id: user._id}, {$push: {internships: newInternship}}, {useFindAndModify: false}, 
              function (err, sucess) {
                if (err) {
                  res.status(400).json(err);
                } else {
                  res.json('internship ' + newInternship._id + ' saved with ' + user.username);
                }
              });
          })
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
