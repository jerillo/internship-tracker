const router = require('express').Router();
let Internship = require('../models/internship');
let User = require('../models/user');
var ObjectId = require('mongoose').Types.ObjectId;

router.route('/:id').delete((req, res) => { 
  Internship.findByIdAndDelete(req.params.id)
      .then(() => {
        User.findOneAndUpdate({username : req.body.username}, {$pull: {internships: new ObjectId(req.params.id)}}, {useFindAndModify: false},
        function(err, updatedUser) {
          if (err) {
            res.status(400).json('Error: ' + err);
          } else {
            res.json('Internship ' + req.params.id + ' deleted for user ' + req.body.username);
          }
        })
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
