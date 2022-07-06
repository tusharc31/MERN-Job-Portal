const router = require('express').Router();
let Recruiter = require('../models/recruiter.model');




router.route('/').get((req, res) => {
  Recruiter.find()
    .then(recruiter => res.json(recruiter))
    .catch(err => res.status(400).json('Error: ' + err));
});




router.route('/add').post((req, res) => {
  const name = req.body.name;
  const emailid = req.body.emailid;
  const contactnumber = Number(req.body.contactnumber);
  const bio = req.body.bio;
  const password = req.body.password;

  const newRecruiter = new Recruiter({
    name,
    emailid,
    contactnumber,
    bio,
    password,
  });

  newRecruiter.save()
  .then(() => res.json('Recruiter added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});




// router.route('/:id').get((req, res) => {
//   Recruiter.findById(req.params.id)
//     .then(recruiter => res.json(recruiter))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

router.route("/:emailid").get((req, res) => {
  id = req.params.emailid;
  Recruiter.find({ emailid: id })
    .then(recruiter => res.json(recruiter))
    .catch(err => res.status(400).json('Error: ' + err));
});




router.route('/:emailid').delete((req, res) => {
  id = req.params.emailid;
  Recruiter.findOneAndDelete( { emailid: id} )
    .then(() => res.json('Recruiter deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});




router.route('/update/:emailid').post((req, res) => {
  id = req.params.emailid;
  Recruiter.findOne( { emailid: id} )
    .then(recruiter => {
      recruiter.name = req.body.name;
      recruiter.emailid = req.body.emailid;
      recruiter.contactnumber = Number(req.body.contactnumber);
      recruiter.bio = req.body.bio;
      recruiter.password = req.body.password;

      recruiter.save()
        .then(() => res.json('Recruiter updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});




module.exports = router;