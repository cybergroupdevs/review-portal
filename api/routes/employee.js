const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');


const Employee = require('../schemas/employee');

router.post('/signup', async (req, res) => {
    
    // if(error) return res.status(400).send({
    //     success: false,
    //     error: error.details[0].message
    // });
    const details = req.body ;
    let employee = await Employee.findOne({ "email": details.email });
    if(employee) return res.status(401).send({
        success: false,
        error: 'User with this email already registered'
    });

    
    employee = new Employee(details);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(details.password, salt);

    employee.password = hashedPassword;

    employee = await employee.save();

    res.send({
        success: true,
        data: employee
    });
});


router.get('/employeeList', async (req, res) => {
    const listOfEmployees = await Employee.find({},{"name":1, 'email':1, 'designation':1, 'reviewer':1, "qualityAnalyst":1});
    
    console.log(listOfEmployees, 'hereeeeeeeeeee');

    res.send({
        success: true,
        array: {
            listOfEmployees
        }
    });
});

module.exports = router;