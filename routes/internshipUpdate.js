const router = require('express').Router();
let Internship = require('../models/internship');
let User = require('../models/user');

router.route('/:id').post((req, res) => {
    Internship.findById(req.params.id)
      .then(internship => {
          if (req.body.company) {
              internship.company = req.body.company;
          }
          if (req.body.position) {
              internship.position = req.body.position;
          }
          if (req.body.status) {
              internship.status = req.body.status;
          }
          if (req.body.primaryContact) {
              internship.primaryContact = req.body.primaryContact;
          }
          internship.save()
            .then(() => res.json('Internship Information Updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
