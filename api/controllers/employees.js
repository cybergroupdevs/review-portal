const bcrypt = require('bcrypt');
const config = require('config');
const model = require('../models')
const jwtHandler = require('../jwtHandler');
const nodemailer = require('nodemailer');

class Employee {
    
    constructor(){
        console.log("reached controller");
    }

    async create(req,res) {
        if(jwtHandler.tokenVerifier(req.headers.token)){
            let employeeObj ={
                firstName: req.body.firstName,
                lastName : req.body.lastName,
                email: req.body.email,
                designation: req.body.designation,
                skills: [req.body.skills],
                cgiCode: req.body.cgiCode,
                previousExperience: req.body.previousExperience,
                totalExperience: req.body.totalExperience,
                location: req.body.location
            }
            console.log(employeeObj);
            const employee = await model.employee.save(employeeObj);
            res.status(200).send(employee);
        }
        else{
            res.status(401).send({
                "message": "Unauthorized"
            });
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

    // async showUser(req,res){
    //     const employee = await model.employee.get({_id: req.params.parameter})
    //     res.send(employee[0])
    // }

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
        let user = await model.employee.get({$and : [{"email": req.body.email},{"password": req.body.password}]
                                                }, 
                                                {"email": 1,
                                                "firstName": 1,
                                                "lastName": 1,
                                                "totalExperience": 1,
                                                "phoneNo": 1,
                                                "_id": 1,
                                                "designation": 1
                                            });
        console.log(user);
        // debugger
        if(JSON.stringify(user) != JSON.stringify([])){
            let token = jwtHandler.tokenGenerator(user);
            if(token != null){
                let resBody = {
                    "token": token
                };
                res.status(200).send(resBody);
            }
        }
        else{
            res.status(401).send({
                "message": "Unauthorized, Invalid Username or Password"});
        }
    }
    
}

module.exports = new Employee();
