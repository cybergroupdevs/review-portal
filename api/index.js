const express = require('express');
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const app = express();
const database = require('./database/config');
app.use(bodyParser.json());
var cors = require('cors')
const model =require('./models');
app.use(cors());
app.use(express.json()); //Read
require('./routes/route.js')(app);


const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log(`Listening port ${port}`);
})
