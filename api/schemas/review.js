const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Employee  = require('./employee').Schema;

const reviewSchema = new mongoose.Schema({

    employeeId: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        required:true
    },
    divisionName:{
        type:String,
        default:null
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
                enum: [null, 'Needs Improvement', 'Meets expectation']
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
                enum: [null, 'Needs Improvement', 'Meets expectation']
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
                enum: [null, 'Needs Improvement', 'Meets expectation']
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
                enum: [null, 'Needs Improvement', 'Meets expectation']
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
                enum: [null, 'Needs Improvement', 'Meets expectation']
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
                enum: [null, 'Needs Improvement', 'Meets expectation']
            }
        }
    },

    date: {
        type: Date,
        default: Date.now()
    },

    targetDate: {
        type: Date,
        required: true
    },

    status:{
        type:String,
        default:"Pending-Self-Appraisal",
        enum:["Pending-Self-Appraisal","Pending-Reviewer","Pending-QAer", "Close"]
    },

    reviewCycle:{
        type: String,
        default: null
    },

    promotionCycle:{
        type: String,
        default: null
    },

    flag:{
        type: Number,
        default: 0
    }

});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
