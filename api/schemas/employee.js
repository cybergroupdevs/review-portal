


module.exports={
name:{
type:String,
default:null
},
email:{
type:String,
required:true
},
phoneNo:{
type:String,
default:null
},
address:{
city:{
type:String,
default:null
},
state:{
type:String,
default:null
},
pincode:{
type:String,
default:null
}
},
designation:{
type:String,
default:'Consultant 1',
enum: ['Consultant 1','Consultant 2','Associate 1','Associate 2']
},
technology: [{type:String}]
 
}

