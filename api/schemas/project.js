const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const projectSchema = Schema({

    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    },
    qualityAnalyst: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    },
    status: {
        type: String
    },
    date: {
        type: Date
    },

});
const Project = mongoose.model('Project', projectSchema);
module.exports = Project;