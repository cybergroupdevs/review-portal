const mongoose = require('mongoose');
//mongoose is a wrapper of mongoDB

const url = "mongodb://localhost:27017/hrms";
// const url = "mongodb+srv://faizan:mongofaizan20@hrms-hkobx.mongodb.net/hrms?retryWrites=true&w=majority";
//const atlasURL = "mongodb+srv://faizan:<password>@hrms-hkobx.mongodb.net/test?retryWrites=true&w=majority";

mongoose.Promise = global.Promise;

//connecting to the database
mongoose.connect(url, {useNewUrlParser: true, keepAlive: 1}).then((res) =>{
    console.log("Connection Established -- DONE");
}).catch(error =>{
    console.log(error.message)
});
module.exports = mongoose;