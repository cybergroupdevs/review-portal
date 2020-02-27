// const express = require('express');
// const router = express.Router();
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const config = require('config');
// const Employee = require('../schemas/employee');

const model = require('../models')
class Employee {
    constructor(){
        console.log("reached controller")
    }

    async create(req,res) {
    //     const details = req.body ;
    // let employee = await Employee.findOne({ "email": details.email });
    // if(employee) return res.status(401).send({
    //     success: false,
    //     error: 'User with this email already registered'
    // });

    //     employee = new Employee(details);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // employee.password = hashedPassword;

    // employee = await employee.save();

    // res.send({
    //     success: true,
    //     data: employee
    // });

    let employeeObj ={
        firstName: req.body.firstName,
        lastName : req.body.lastName,
        email: req.body.email,
        designation: req.body.designation,
        password:hashedPassword,
        reviewer : req.body.reviewer,
        qualityAnalyst : req.body.qualityAnalyst,
    }
    console.log(employeeObj)
            const employee= await model.employee.save(employeeObj)
            res.send(employee)
};

async index(req,res){
    const employeeList = await model.employee.get();
    res.send(employeeList)
}

async show(req,res){
    const employee = await model.employee.get({_id: req.params.parameter})
    res.send(employee[0])
}

async update(req,res) {
    let updateObj= req.body
    console.log(updateObj)
    const employee= await model.employee.update({_id: req.params.parameter},  updateObj)
    res.send(employee)

}    
async delete(req,res){
    console.log(req.params.parameter)
    const employee =await model.employee.delete({_id: req.params.parameter})
    res.send("deleted")
}
}
module.exports = new Employee();