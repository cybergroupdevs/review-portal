const express= require('express');
const bodyParser= require('body-parser')
const app = express();
const database = require('./database/config')
const cors = require('cors');
const mongoose = require('mongoose');

app.use(bodyParser.json())
app.use(cors({origin: '*'}));
// require('./routes/route.js')(app); 
// const employeeRoutes = require('./routes/employee');
require("./routes/route")(app);

app.listen(3001, () =>{
    console.log("Listening port 3001");
});