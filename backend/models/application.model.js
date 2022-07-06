const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const applicationSchema = new Schema({
  jobid: {type: String},
  recruiteremailid: {type: String},
  applicantemailid: {type: String},
  sop: {type: String},
  status: {type: String, default: 'Pending'},
  dateofapplication: {type: Date, default: Date.now()},
  dateofjoining: {type: Date},
  name_forrec: { type: String},
  skills_forrec: { type: String},
  institutename_forrec: {type: String},
  start_forrec: { type: String},
  end_forrec: { type : String},
  rating_forrec: { type : Number},
  button_forrec: { type : String},
  hasrecruiter: { type : Number},
  hasapplicant : { type : Number}
}, {
  timestamps: true,
});

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;