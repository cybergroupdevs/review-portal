const mongoose = require('mongoose');
// const FileType = require('file-type');
// const Schema = mongoose.Schema;

module.exports = {
    firstName: {
        type: String,
        max: 40,
        required: true
    },
    lastName: {
        type: String,
        max: 40,
        required: true
    },
    email: {
        type: String,
        max: 40,
        required: true,
        unique: true
    },
    password: {
        type: String,
        max: 255,
        required: true,
    },
    totalExperience: {
        type: Number,
 
    },
    previousExperience: {
        type:Number
    },
    skills: [{
        type: String
    }],
    location: {
        type: String
    },
    designation: {
        type: String
    },
    division: {
        type: String
    },
    joined: {
        type:Date,
        default: Date.now()
    },
    phoneNo: {
        type: String,
        max: 10
    },
    competenceManager: {
        type: String
    },
    projectOwners: {
        type: String
    },
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    qualityAnalyst: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    }
}