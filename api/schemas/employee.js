const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const userSchema = Schema({
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
 
    },
    previousExperience: {
        
    },
    skills: {
        type: String
    },
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
    resume:{
        type: File,
    },
    competenceManager: {
        type: String
    },
    projectOwners: {
        type: String
    },
    project: [{
        type: Schema.Types.ObjectId,
        ref: "Project"
    }],
    reviewer: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    qualityAnalyst: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
});
 
const User = mongoose.model('User', userSchema);
module.exports = User;