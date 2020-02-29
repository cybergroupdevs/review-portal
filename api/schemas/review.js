const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Employee  = require('./employee').Schema;

const reviewSchema = new mongoose.Schema({

    employeeId: {
        type: Schema.Types.ObjectId,
        ref: "Employee"
    },
    reviewer: {
        type: Schema.Types.ObjectId,
        ref: "Employee"
    },
    qualityAnalyst: {
        type: Schema.Types.ObjectId,
        ref: "Employee"
    },
    technicalSkill:{
        comment:{
            type:String,
            default:null
        },
        binaryReview:{
            type:String,
            default:' Needs Improvement',
            enum: ['Needs Improvement','Meets expectation']
        }
    },
    personality:{
        comment:{
            type:String,
            default:null
        },
        binaryReview:{
            type:String,
            default:' Needs Improvement',
            enum: ['Needs Improvement','Meets expectation']
        }
    },
    communication:{
        content:{
            type:String,
            default:null
        },
        binaryReview:{
            type:String,
            default:' Needs Expectation',
            enum: ['Needs Expectation','Meets expectation']
        }
    },

    date: {
        type: Date,
        default:Date.now()
    },
    
    submitted:{
        type:Boolean,
        default:false
    },
    status:{
        type:String,
        default:"saved self appraisal",
        enum:["saved self appraisal","Pending-Reviewer","Pending-QAer", "close"]
    },
    reviewCycle:{
        type:String
    },
    promotionCycle:{
        type:String
    }

});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;