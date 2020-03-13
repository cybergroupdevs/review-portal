const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());

app.use(cors({origin: '*'}));

require('./routes/route.js')(app);  

app.listen(3001, () =>{
    console.log("Listening port 3001");
});

