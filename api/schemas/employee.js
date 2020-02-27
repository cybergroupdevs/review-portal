


module.exports={
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
// phoneNo:{
// type:String,
// default:null
// },
location:{
type:String,
default:null
},
designation:{
type:String,
default:'Consultant 1',
enum: ['Consultant 1','Consultant 2','Associate 1','Associate 2']
},
division: {
    type:String
},
joined:
{
    type:Date,
    default:Date.now()

},
totalExperience:{
    type:Number
},
previousExperience:{
    type:Number
},
skills:[{
    type:String
}],

reviewer:{
    type:String
},
qualityAnalyst:{
    type:String
}
 
}

