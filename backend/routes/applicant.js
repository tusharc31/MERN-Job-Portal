const router = require('express').Router();
let Applicant = require('../models/applicant.model');



router.route('/').get((req, res) => {
  Applicant.find()
    .then(applicant => res.json(applicant))
    .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/add').post((req, res) => {
  const name = req.body.name;
  const emailid = req.body.emailid;
  const institutename = req.body.institutename;
  const startyear = req.body.startyear;
  const endyear = req.body.endyear;
  const skills = req.body.skills;
  const rating = req.body.rating;
  const ratingsum = req.body.ratingsum;
  const ratingtimes = req.body.ratingtimes;
  const password = req.body.password;

  const newApplicant = new Applicant({
    name,
    emailid,
    institutename,
    startyear,
    endyear,
    skills,
    rating,
    ratingsum,
    ratingtimes,
    password
  });

  newApplicant.save()
    .then(() => res.json('Applicant added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});



// router.route('/:id').get((req, res) => {
//   Applicant.findById(req.params.id)
//     .then(applicant => res.json(applicant))
//     .catch(err => res.status(400).json('Error: ' + err));
// });
//////////////////// GET BY EMAIL ////////////////////////////////

router.route("/:emailid").get((req, res) => {
  id = req.params.emailid;
  Applicant.find({ emailid: id })
    .then(applicant => res.json(applicant))
    .catch(err => res.status(400).json('Error: ' + err));
});



// router.route('/:id').delete((req, res) => {
//   Applicant.findByIdAndDelete(req.params.id)
//     .then(() => res.json('Applicant deleted.'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });
//////////////////// DELETE BY EMAIL /////////////////////////////

router.route('/:emailid').delete((req, res) => {
  id = req.params.emailid;
  Applicant.findOneAndDelete({ emailid: id })
    .then(() => res.json('Applicant deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});


// takes email id and updates
router.route('/update/:emailid').post((req, res) => {
  id = req.params.emailid;
  Applicant.findOne({ emailid: id })
    .then(applicant => {
      applicant.name = req.body.name;
      applicant.emailid = req.body.emailid;
      applicant.institutename = req.body.institutename;
      applicant.startyear = req.body.startyear;
      applicant.endyear = req.body.endyear;
      applicant.skills = req.body.skills;
      applicant.rating = req.body.rating;
      applicant.ratingsum = req.body.ratingsum;
      applicant.ratingtimes = req.body.ratingtimes;
      applicant.password = req.body.password;

      applicant.save()
        .then(() => res.json('Applicant updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;

// {
// 	"name": "Tushar Choudhary",
// 	"emailid": "tushar.choudhary@research.iiit.ac.in",
// 	"institutename": ["MIS", "IIIT"],
// 	"startyear": [2008, 2019],
// 	"endyear": ["2018", "0"],
// 	"skills": "C++, Python",
// 	"rating": 4
// }





router.route('/image/:email').post((req, res) => {

  console.log(req.body);
  var im = req.files.dp1;

  im.mv('image/' + req.params.email, function (err) {
    if (err) {
      // console.log(err);
      res.json({ "status": "Image not uploaded" });
    }
    else {
      res.json({ "status": "Image uploaded successfully" });
    }
  });

});


router.route('/resume/:email').post((req, res) => {

  console.log(req.body);
  var re = req.files.dp2;

  re.mv('resume/' + req.params.email, function (err) {
    if (err) {
      // console.log(err);
      res.json({ "status": "Resume not uploaded" });
    }
    else {
      res.json({ "status": "Resume uploaded successfully" });
    }
  });
});