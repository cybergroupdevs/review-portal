const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new mongoose.Schema({
    cgiCode:{
        type:String,
        default:null,
        unique:true
    },
    firstName:{
        type:String,
        required:true
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
        type:String,
        required:true,
        default: "cybergroup@noida"
    },
    location:{
        type:String,
        default:null
    },
    designation:{
        type:String,
        default:'Consultant 1',
        enum: ['Intern', 'Consultant 1', 'Consultant 2', 'Associate 1', 'Associate 2', 'ADMIN', 'Manager 1', 'Manager 2', 'Principal 1', 'Principal 2']
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
    }]
})

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
