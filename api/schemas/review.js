const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Employee  = require('./employee').Schema;

const reviewSchema = new mongoose.Schema({

    employeeId: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        required:true
    },    
    reviewer: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        required:true
    },
    qualityAnalyst: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        required:true
    },
    formName: {
        type: String,
        required: true
    },
    technicalSkill:{
        selfEvaluation:{
            comment:{
                type: String,
                default: null
            },
            assessment:{
                type: String,
                default: null,
                enum: [null, 'Needs Improvement', 'Meets Expectation', 'Exceeds Expectation', 'Not Applicable']
            }
        },
        reviewerEvaluation:{
            comment:{
                type: String,
                default: null
            },
            assessment:{
                type: String,
                default: null,
                enum: [null, 'Needs Improvement', 'Meets expectation', 'Exceeds Expectation', 'Not Applicable']
            }
        }
    },
    personality:{
        selfEvaluation:{
            comment:{
                type: String,
                default: null
            },
            assessment:{
                type: String,
                default: null,
                enum: [null, 'Needs Improvement', 'Meets expectation', 'Exceeds Expectation', 'Not Applicable']
            }
        },
        reviewerEvaluation:{
            comment:{
                type: String,
                default: null
            },
            assessment:{
                type: String,
                default: null,
                enum: [null, 'Needs Improvement', 'Meets expectation', 'Exceeds Expectation', 'Not Applicable']
            }
        }
    },
    communication:{
        selfEvaluation:{
            comment:{
                type: String,
                default: null
            },
            assessment:{
                type: String,
                default: null,
                enum: [null, 'Needs Improvement', 'Meets expectation', 'Exceeds Expectation', 'Not Applicable']
            }
        },
        reviewerEvaluation:{
            comment: {
                type: String,
                default: null
            },
            assessment:{
                type: String,
                default: null,
                enum: [null, 'Needs Improvement', 'Meets expectation', 'Exceeds Expectation', 'Not Applicable']
            }
        }
    },

    date: {
        type: Date,
        default: Date.now()
    },

    targetDate: {
        type: Date,
        default: () => new Date(+new Date() + 7*24*60*60*1000),
        required: true
    },

    status:{
        type:String,
        default:"Pending-Self-Appraisal",
        enum:["Pending-Self-Appraisal", "Pending-Reviewer", "Pending-QAer", "Close"]
    },

    reviewCycle:{
        type: String,
        required: true
    },

    flag:{
        type: Number,
        default: 0
    }

});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
