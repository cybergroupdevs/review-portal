const express = require('express');
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

const database = require('./database/config');
app.use(bodyParser.json());
var cors = require('cors')
const model =require('./models');

app.use(express.json()); //Read
require('./routes/route.js')(app);


app.use(cors({origin: '*'}));
// require('./routes/route.js')(app); 
// const employeeRoutes = require('./routes/employee');


app.listen(3001, () =>{
    console.log("Listening port 3001");
});

