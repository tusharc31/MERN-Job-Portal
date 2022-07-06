const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobSchema = new Schema({
    title: { type: String, required: true },
    recruiterid: { type: String, required: true },
    recruitername: { type: String, required: true },
    max_applications: { type: Number },
    curr_applications: { type: Number, default: 0 },
    max_positions: { type: Number },
    curr_positions: { type: Number, default: 0 },
    rem_positions: { type: Number},
    postingdate: { type: Date, default: Date.now },
    deadline: { type: Date },
    skills: { type: String, required: true },
    jobtype: { type: String, default: "" },
    duration: { type: Number, default: 0 },
    salary: { type: Number },
    rating: { type: Number },
    ratingsum: { type: Number },
    ratingtimes: { type: Number },
    status: { type: String},
    color: { type: String}
}, {
    timestamps: true,
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
