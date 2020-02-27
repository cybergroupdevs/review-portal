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
<<<<<<< HEAD

=======
>>>>>>> 45c2b8dd226370aece099a5872be632d4a055b19
    location:{
        type:String,
        default:null
    },
    designation:{
        type:String,
        default:'Consultant 1',
<<<<<<< HEAD
        enum: ['Consultant 1','Consultant 2','Associate 1','Associate 2']
=======
        enum: ['Intern','Consultant 1','Consultant 2','Associate 1','Associate 2']
>>>>>>> 45c2b8dd226370aece099a5872be632d4a055b19
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