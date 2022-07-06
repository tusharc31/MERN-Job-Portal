const router = require('express').Router();
let Application = require('../models/application.model');
var nodemailer = require('nodemailer');


router.route('/').get((req, res) => {
    Application.find()
        .then(application => res.json(application))
        .catch(err => res.status(400).json('Error: ' + err));
});




// app.post('/upload', (req, res) => {
//     if (!req.files) {
//         return res.status(500).send({ msg: "file is not found" })
//     }
//         // accessing the file
//     const myFile = req.files.file;
//     //  mv() method places the file inside public directory
//     myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
//         if (err) {
//             console.log(err)
//             return res.status(500).send({ msg: "Error occured" });
//         }
//         // returing the response with file path and name
//         return res.send({name: myFile.name, path: `/${myFile.name}`});
//     });
// })




//////////// find all applications of this applicant

router.route("/:applicantemailid").get((req, res) => {
    id = req.params.applicantemailid;
    Application.find({ applicantemailid: id })
        .then(application => res.json(application))
        .catch(err => res.status(400).json('Error: ' + err));
});




/////////// delete all applications for this job /////////////////////

router.route("/jobgone/:jobid").delete((req, res) => {
    id = req.params.jobid;
    Application.deleteMany({ jobid: id })
        .then(application => res.json(application))
        .catch(err => res.status(400).json('Error: ' + err));
});




/////////// returns for this job and this applicant ///////////////////

router.route("/forjob/:applicantemailid/:jobid").get((req, res) => {
    id1 = req.params.applicantemailid;
    id2 = req.params.jobid;
    Application.find({ applicantemailid: id1, jobid: id2 })
        .then(application => res.json(application))
        .catch(err => res.status(400).json('Error: ' + err));
});





router.route("/confirmation/:email/:title").get((req, res) => {
    applicantemailid = req.params.email;
    jobtitle = req.params.title;
    console.log(applicantemailid);
    console.log(jobtitle);
    /////////////////////////////////// EMAIL ON ACCEPTANCE ///////////////////////////

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jobspot.dass@gmail.com',
            pass: 'jobspot0000'
        }
    });

    var mailOptions = {
        from: 'jobspot.dass@gmail.com',
        to: applicantemailid,
        subject: 'Congratulations!',
        text: jobtitle + ' accepted your application.'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.status(error);
            console.log(error);
        } else {
            res.status('Email sent: '+info.response);
            console.log('Sent!');
        }

        // if (error) {
        //     console.log(error);
        // } else {
        //     console.log('Email sent: ' + info.response);
        // }
    });

    ////////////////////////////////////////////////////////////////////////////////////

    // Application.find({ applicantemailid: id1, jobid: id2 })
    //     .then(application => res.json(application))
    //     .catch(err => res.status(400).json('Error: ' + err));
});










/////////// returns for this job ///////////////////////////////
router.route("/perjob/:jobid").get((req, res) => {
    id = req.params.jobid;
    Application.find({ jobid: id, status: {"$ne":'Rejected'}})
        .then(application => res.json(application))
        .catch(err => res.status(400).json('Error: ' + err));
});



/////////// returns for this application id ///////////////////////////////
router.route("/byid/:id").get((req, res) => {
    Application.findById(req.params.id)
        .then(application => res.json(application))
        .catch(err => res.status(400).json('Error: ' + err));
});




////////// returns all employees of the company ///////////////////////////

router.route("/employees/:recruiteremailid").get((req, res) => {
    id = req.params.recruiteremailid;
    Application.find({ recruiteremailid: id, status: {"$eq":'Accepted'}})
        .then(application => res.json(application))
        .catch(err => res.status(400).json('Error: ' + err));
});




////////// updates for this application id
router.route('/updatebyid/:id').post((req, res) => {
    Application.findById(req.params.id)
      .then(application => {
        application.jobid = req.body.jobid,
        application.recruiteremailid = req.body.recruiteremailid,
        application.applicantemailid = req.body.applicantemailid,
        application.sop = req.body.sop,
        application.status = req.body.status,
        application.dateofapplication = req.body.dateofapplication,
        application.dateofjoining = req.body.dateofjoining,
        application.name_forrec = req.body.name_forrec,
        application.skills_forrec = req.body.skills_forrec,
        application.institutename_forrec = req.body.institutename_forrec,
        application.start_forrec = req.body.start_forrec,
        application.end_forrec = req.body.end_forrec,
        application.rating_forrec = req.body.rating_forrec,
        application.button_forrec = req.body.button_forrec
        application.hasrecruiter = req.body.hasrecruiter,
        application.hasapplicant = req.body.hasapplicant
    
  
        application.save()
          .then(() => res.json('application updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });



router.route('/add').post((req, res) => {

    const jobid = req.body.jobid;
    const recruiteremailid = req.body.recruiteremailid;
    const applicantemailid = req.body.applicantemailid;
    const sop = req.body.sop;
    const status = req.body.status;
    const dateofapplication = req.body.dateofapplication;
    const dateofjoining = req.body.dateofjoining;

    const name_forrec = req.body.name_forrec;
    const skills_forrec = req.body.skills_forrec;
    const institutename_forrec = req.body.institutename_forrec;
    const start_forrec = req.body.start_forrec;
    const end_forrec = req.body.end_forrec;
    const rating_forrec = req.body.rating_forrec;
    const button_forrec = req.body.button_forrec;

    const hasrecruiter = req.body.hasrecruiter;
    const hasapplicant = req.body.hasapplicant;

    const newApplication = new Application({
        jobid,
        recruiteremailid,
        applicantemailid,
        sop,
        status,
        dateofapplication,
        dateofjoining,
        name_forrec,
        skills_forrec,
        institutename_forrec,
        start_forrec,
        end_forrec,
        rating_forrec,
        button_forrec,
        hasrecruiter,
        hasapplicant
    });

    newApplication.save()
        .then(() => res.json('Application added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;