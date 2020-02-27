const express= require('express');
const bodyParser= require('body-parser')
const app = express();
const database = require('./database/config')
const config = require('config');
const cors = require('cors');
const mongoose = require('mongoose');
app.use(bodyParser.json())

require('./routes/route.js')(app); 


app.use(cors());
app.use(express.json());



app.listen(3001, () =>{
    console.log("Listening port 3001")
});

