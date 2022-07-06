const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recruiterSchema = new Schema({
    name: { type: String, required: true },
    emailid: { type: String, required: true, unique: true },
    contactnumber: { type: Number, required: true },
    bio: { type: String, required: true},
    password: { type: String, required: true },
}, {
    timestamps: true,
});

const Recruiter = mongoose.model('Recruiter', recruiterSchema);

module.exports = Recruiter;


// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     minlength: 3
//   },
// }, {
//   timestamps: true,
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;