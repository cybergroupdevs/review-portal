const express = require('express');
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const database = require('./database/config');
const xoauth2 = require("xoauth2");
const nodemailer =require('nodemailer')
var employee = require('./controllers/employees')
var password = employee.password

app.use(bodyParser.json());

app.use(cors({origin: '*'}));

require('./routes/route.js')(app);

// require('./routes/route.js')(app); 
// const employeeRoutes = require('./routes/employee');

app.post('/sendFormData', (req, res) => {
    console.log(req.body, 'data of form');
    console.log(password, "password")
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      secure: 'false',
      port: '465',
      auth: { 
        user: 'mongmawchetna@gmail.com', // team members allow less secure apps to acees your gmail in settings for functionality to work
        pass: 'mongmaw@chetna21ok '//put your password here
      }
      
    });
  
    var mailOptions = {
      from: 'vishal.ranjan@cygrp.com',
      to: `<${req.body.email}>`, // must be Gmail
      cc:`${req.body.firstName} <${req.body.email}>`,
      subject: 'Login Credentials to HRMS',
      html: `
              <table style="width: 100%; border: none">
                <thead>
                  <tr style="background-color: #000; color: #fff;">
                    <th style="padding: 10px 0">CGI code</th>
                    <th style="padding: 10px 0">First Name</th>
                    <th style="padding: 10px 0">Last Name</th>
                    <th style="padding: 10px 0">E-mail</th>
                    <th style="padding: 10px 0">Password</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="text-align: center">${req.body.cgiCode}</td>
                    <td style="text-align: center">${req.body.firstName}</td>
                    <td style="text-align: center">${req.body.lastName}</td>
                    <td style="text-align: center">${req.body.email}</td>
                    <th style="text-align: center">${password}</th>
                  </tr>
                </tbody>
              </table>
            `
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({
          message: 'successfuly sent!'
        })
      }
    });
  
  });

app.listen(3001, () =>{
    console.log("Listening port 3001");
});

