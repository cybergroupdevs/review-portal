const express= require('express');
const bodyParser= require('body-parser')
const app = express();
const database = require('./database/config')
app.use(bodyParser.json())

require('./routes/route.js')(app);


app.listen(3000, () =>{
    console.log("Listening port 3000")
});

