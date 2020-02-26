const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
 
const employeeSchema = new mongoose.Schema({
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
    // resume:{
    //     type: File,
    // },
    competenceManager: {
        type: String
    },
    projectOwners: {
        type: String
    },
    // project: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "Project"
    // }],
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    qualityAnalyst: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
});
 
const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
