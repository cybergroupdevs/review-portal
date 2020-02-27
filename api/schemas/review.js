const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const reviewSchema = Schema({

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