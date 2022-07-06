const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const applicantSchema = new Schema({
    name: { type: String, required: true },
    emailid: { type: String, required: true, unique: true },
    institutename: {type: String},
    startyear: {type: String},
    endyear: {type: String},
    skills: { type: String, required: true },
    rating: { type: Number, required: true },
    ratingsum: { type: Number, required: true },
    ratingtimes: { type: Number, required: true },
    password: { type: String, required: true }
}, {
    timestamps: true,
});

const Applicant = mongoose.model('Applicant', applicantSchema);

module.exports = Applicant;
