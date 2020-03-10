const bcrypt = require('bcrypt');
const config = require('config');
const model = require('../models')
const jwtHandler = require('../jwtHandler');
const nodemailer = require('nodemailer');
var generator = require('generate-password');
const saltRounds = 10;
class Employee {
    
    constructor(){
        console.log("reached controller");
    }

    async create(req,res) {
      console.log(req.body)
      const password = generator.generate({
        length: 10,
        numbers: true
       });

       let mailObject = {
        "email" : req.body.email,
        "cgiCode" : req.body.cgiCode,
        "firstName" : req.body.firstName,
        "lastName" : req.body.lastName,
       };
       

      console.log(password);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      if(jwtHandler.tokenVerifier(req.headers.token)){
        let employeeObj ={
          firstName: req.body.firstName,
          lastName : req.body.lastName,
          email: req.body.email,
          designation: req.body.designation,
          password: hashedPassword,
          skills: [req.body.skills],
          cgiCode: req.body.cgiCode,
          previousExperience: req.body.previousExperience,
          totalExperience: req.body.totalExperience,
          location: req.body.location
        }
        console.log(employeeObj);
        const employee = await model.employee.save(employeeObj);
        const mail = await new Employee().sendMail(mailObject, password);
        if(mail == true){
            res.status(200).send(employee);
        }
        else if(mail == false){
            res.status(500).send({
                "message": "Couldn't Generate Mail"
            });
        }
      }
      else{
        res.status(401).send({
          "message": "Unauthorized"
        });
      }
}
  
    async getEmployeeDetails(req, res){
        if(jwtHandler.tokenVerifier(req.headers.token)){
            let criteria = {"cgiCode": req.params.cgiCode};
            const empId = await model.employee.get(criteria, 
                                    {"email": 1,
                                    "firstName": 1,
                                    "lastName": 1,
                                    "_id": 1,
                                    "cgiCode": 1,
                                    "designation": 1});
            res.status(200).send(empId);
        }
        else{
            res.status(401).send({
                "message": "Unauthorized"
            });
        }
        
    }

    async show(req,res){
        if(jwtHandler.tokenVerifier(req.headers.token)){
            const employee = await model.employee.getUserData({"_id": req.params.id});
            res.status(200).send(employee[0]);
        }
        else{
            res.status(401).send({
                "message": "Unauthorized"
            });
        }   
    }

    async index(req,res){
        if(jwtHandler.tokenVerifier(req.headers.token)){
            const employeeList = await model.employee.get();
            res.status(200).send(employeeList);
        }
        else{
            res.status(401).send({
                "message": "Unauthorized"
            });
        }
    }

    async update(req,res) {
        if(jwtHandler.tokenVerifier(req.headers.token)){
            let updateObj= req.body;
            console.log(updateObj);
            const employee= await model.employee.update({_id: req.params.parameter},  updateObj);
            res.status(200).send(employee);
        }
        else{
            res.status(401).send({
                "message": "Unauthorized"
            });
        }
        
    }    
 
    async login(req, res) {
        console.log(req.body);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        console.log(hashedPassword);
        let user = await model.employee.get({$and : [{"email": req.body.email}]
                                                }, 
                                                {"email": 1,
                                                "firstName": 1,
                                                "lastName": 1,
                                                "totalExperience": 1,
                                                "phoneNo": 1,
                                                "_id": 1,
                                                "designation": 1,
                                                "password":1
                                            });
        console.log(user);
        if(JSON.stringify(user) != JSON.stringify([])){
            bcrypt.compare(req.body.password, user[0].password, function (err, result) {
                console.log(result);
                console.log(user[0].password, req.body.password);
                if (result == true) {
                    let token = jwtHandler.tokenGenerator(user);
                    console.log(token);
                    if(token != null){
                        let resBody = {
                            "token": token
                        };
                        res.status(200).send(resBody);
                    }
                }
                else{
                    res.status(401).send({
                        "message": "Unauthorized, Incorrect Password"
                    });
                }
            });
        }
        else{
            res.status(401).send({
                "message": "Incorrect Email or username"
            });
        }
        
        console.log(user); 
    }


    sendMail(mailObject, password){
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
          to: `<${mailObject.email}>`, // must be Gmail
          cc:`${mailObject.firstName} <${mailObject.email}>`,
          subject: 'Login Credentials to HRMS',
          html: `
                  <p>Hello, ${mailObject.firstName}!! We are pleased to have you join us. Here
                  are your login credentials. </p>
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
                        <td style="text-align: center">${mailObject.cgiCode}</td>
                        <td style="text-align: center">${mailObject.firstName}</td>
                        <td style="text-align: center">${mailObject.lastName}</td>
                        <td style="text-align: center">${mailObject.email}</td>
                        <th style="text-align: center">${password}</th>
                      </tr>
                    </tbody>
                  </table>
                  <p>Greetings from CyberGroup.</p>
                `
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Mail Not Sent", error);
                return false;
            } 
            else {
                console.log("Mail sent");
                return true;
            }
        });
      }
    
}

module.exports = new Employee();