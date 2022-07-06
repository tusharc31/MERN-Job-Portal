const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(fileUpload());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const recruiterRouter = require('./routes/recruiter');
const applicantRouter = require('./routes/applicant');
const jobRouter = require('./routes/job');
const applicationRouter = require('./routes/application');

app.use('/recruiter', recruiterRouter);
app.use('/applicant', applicantRouter);
app.use('/job', jobRouter);
app.use('/application', applicationRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});