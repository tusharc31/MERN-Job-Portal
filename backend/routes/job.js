const router = require('express').Router();
let Job = require('../models/job.model');



router.route('/').get((req, res) => {
  Job.find({ deadline: { "$gte": Date.now() } })
    .then(job => res.json(job))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/:recruiteremailid").get((req, res) => {
  id = req.params.recruiteremailid;
  Job.find({ recruiterid: id })
    .then(job => res.json(job))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route("/onlyleft/:recruiteremailid").get((req, res) => {
  id = req.params.recruiteremailid;
  Job.find({ recruiterid: id, rem_positions: { "$gt": 0 } })
    .then(job => res.json(job))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/getbyid/:id').get((req, res) => {
  Job.findById(req.params.id)
    .then(job => res.json(job))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Job.findByIdAndDelete(req.params.id)
    .then(() => res.json('Job deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

  const title = req.body.title;
  const recruiterid = req.body.recruiterid;
  const recruitername = req.body.recruitername;
  const max_applications = req.body.max_applications;
  const curr_applications = req.body.curr_applications;
  const max_positions = req.body.max_positions;
  const curr_positions = req.body.curr_positions;
  const rem_positions = req.body.rem_positions;
  const postingdate = req.body.postingdate;
  const deadline = req.body.deadline;
  const skills = req.body.skills;
  const jobtype = req.body.jobtype;
  const duration = req.body.duration;
  const salary = req.body.salary;
  const rating = req.body.rating;
  const ratingsum = req.body.ratingsum;
  const ratingtimes = req.body.ratingtimes;
  const status = req.body.status;
  const color = req.body.color;

  const newJob = new Job({
    title,
    recruiterid,
    recruitername,
    max_applications,
    curr_applications,
    max_positions,
    curr_positions,
    rem_positions,
    postingdate,
    deadline,
    skills,
    jobtype,
    duration,
    salary,
    rating,
    ratingsum,
    ratingtimes,
    status,
    color
  });

  newJob.save()
    .then(() => res.json('Job added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Job.findById(req.params.id)
    .then(job => {
      job.title = req.body.title,
        job.recruiterid = req.body.recruiterid,
        job.recruitername = req.body.recruitername,
        job.max_applications = req.body.max_applications,
        job.curr_applications = req.body.curr_applications,
        job.max_positions = req.body.max_positions,
        job.curr_positions = req.body.curr_positions,
        job.rem_positions = req.body.rem_positions,
        job.postingdate = req.body.postingdate,
        job.deadline = req.body.deadline,
        job.skills = req.body.skills,
        job.jobtype = req.body.jobtype,
        job.duration = req.body.duration,
        job.salary = req.body.salary,
        job.rating = req.body.rating,
        job.ratingsum = req.body.ratingsum,
        job.ratingtimes = req.body.ratingtimes,
        job.status = req.body.status,
        job.color = req.body.color

      job.save()
        .then(() => res.json('job updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});





// router.route('/:id').get((req, res) => {
//   Job.findById(req.params.id)
//     .then(job => res.json(job))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route("/:emailid").get((req, res) => {
//   id = req.params.emailid;
//   Job.find({ emailid: id })
//     .then(job => res.json(job))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/:emailid').delete((req, res) => {
//   id = req.params.emailid;
//   Job.findOneAndDelete( { emailid: id} )
//     .then(() => res.json('Job deleted.'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/update/:emailid').post((req, res) => {
//   id = req.params.emailid;
//   Job.findOne( { emailid: id} )
//     .then(job => {
//       job.name = req.body.name;
//       job.emailid = req.body.emailid;
//       job.contactnumber = Number(req.body.contactnumber);
//       job.bio = req.body.bio;
//       job.password = req.body.password;

//       job.save()
//         .then(() => res.json('Job updated!'))
//         .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;