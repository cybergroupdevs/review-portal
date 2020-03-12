const bcrypt = require('bcrypt');
const config = require('config');
const model = require('../models')
const jwtHandler = require('../jwtHandler');
const mailer = require('../mailer');
var generator = require('generate-password');
const saltRounds = 10;

const pagination = require("../pagination")

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
       
      console.log("Password:=================>>>>>>>>>>>>>>>>>>", password);
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

        const employee = await model.employee.save(employeeObj);
        console.log("Added ===================>>>>>>>>>>.");

        var cb = function(mail){
            if(mail == true ){
                console.log("True");
                res.status(200).send(employee);
            }
            else if(mail == false){
                console.log("False");
                res.status(500).send({
                    "message": "User Added, Couldn't Generate Mail"
                });
            }
        }

        if(employee){
            await mailer.sendMail(mailObject, password, cb);
        }
        else{
            res.status(500).send({
                "message": "Couldn't Add User"
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
            // get page from query params or default to first page
            console.log(employeeList.length, "---------------------->>> here")
            const page = parseInt(req.query.page) || 1;

            // get pager object for specified page
            const pageSize = 10;
            
            const pager = await pagination.paginate(employeeList.length, page, pageSize);
            console.log(pager, "----------->>>> pager")

            // get page of items from items array
            const pageOfItems = employeeList.slice(pager.startIndex, pager.endIndex + 1);
            

            // return pager object and current page of items
            return res.json({ pager, pageOfItems });
            
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


    
}

module.exports = new Employee();