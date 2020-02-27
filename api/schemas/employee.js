
module.exports={
    cgiCode:{
        type:String,
        default:null
    },
    firstName:{
        type:String,
        default:null
    },
    lastName:{
        type:String,
        default:null
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    },

    location:{
        type:String,
        default:null
    },
    designation:{
        type:String,
        default:'Consultant 1',
        enum: ['Consultant 1','Consultant 2','Associate 1','Associate 2']
    },
    joined: {
        type:Date,
        default:Date.now()
    },
    totalExperience:{
        type:Number,
        default: 0
    },
    previousExperience:{
        type:Number,
        default: 0
    },
    skills:[{
        type:String
    }],
    competenceManager: {
        type: String
    },
    projectOwners: {
        type: String
    },
    project: [{
        type: String
    }],
    reviewer: {
        type: String,
    },
    qualityAnalyst: {
        type: String,
    }
 
}