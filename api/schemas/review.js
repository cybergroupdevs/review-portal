const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Employee  = require('./employee').Schema;

const reviewSchema = new mongoose.Schema({

    employeeId: {
        // type: Schema.Types.ObjectId,
        // ref: "Employee",
        // required:true
        type: String
    },
    divisionName:{
        type:String,
        default:null
    },
    
    reviewer: {
        // type: Schema.Types.ObjectId,
        // ref: "Employee",
        // required:true
        type: String
    },
    qualityAnalyst: {
        // type: Schema.Types.ObjectId,
        // ref: "Employee",
        // required:true
        type: String
    },
    cgiCode: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    }
    // technicalSkill:{
    //     selfEvaluation:{
    //         comment:{
    //             type:String,
    //             default:null
    //         },
    //         assessment:{
    //             type:String,
    //             default:' Needs Improvement',
    //             enum: ['Needs Improvement','Meets expectation']
    //         }
    //     },
    //     reviewerEvaluation:{
    //         comment:{
    //             type:String,
    //             default:null
    //         },
    //         assessment:{
    //             type:String,
    //             default:' Needs Improvement',
    //             enum: ['Needs Improvement','Meets expectation']
    //         }
    //     }
    // },
    // personality:{
    //     selfEvaluation:{
    //         comment:{
    //             type:String,
    //             default:null
    //         },
    //         assessment:{
    //             type:String,
    //             default:' Needs Improvement',
    //             enum: ['Needs Improvement','Meets expectation']
    //         }
    //     },
    //     reviewerEvaluation:{
    //         comment:{
    //             type:String,
    //             default:null
    //         },
    //         assessment:{
    //             type:String,
    //             default:' Needs Improvement',
    //             enum: ['Needs Improvement','Meets expectation']
    //         }
    //     }
    // },
    // communication:{
    //     selfEvaluation:{
    //         comment:{
    //             type:String,
    //             default:null
    //         },
    //         assessment:{
    //             type:String,
    //             default:' Needs Improvement',
    //             enum: ['Needs Improvement','Meets expectation']
    //         }
    //     },
    //     reviewerEvaluation:{
    //         comment:{
    //             type:String,
    //             default:null
    //         },
    //         assessment:{
    //             type:String,
    //             default:' Needs Improvement',
    //             enum: ['Needs Improvement','Meets expectation']
    //         }
    //     }
    // },

    // date: {
    //     type: Date,
    //     default:Date.now()
    // },
    
    // submitted:{
    //     type:Boolean,
    //     default:false
    // },
    // status:{
    //     type:String,
    //     default:"saved self appraisal",
    //     enum:["saved self appraisal","Pending-Reviewer","Pending-QAer", "close"]
    // },
    // reviewCycle:{
    //     type:String,
    //     default:null
    // },
    // promotionCycle:{
    //     type:String,
    //     default:null
    // },
    // flag:{
    //     type: Number,
    //     default: 0
    // }

});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;


