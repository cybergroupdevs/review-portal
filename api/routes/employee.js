const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');


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
    const listOfEmployees = await Employee.find().select("-password");


    console.log(listOfEmployees, 'hereeeeeeeeeee');

    res.send({
        success: true,
        array: {
            listOfEmployees
        }
    });
    
});
router.get('/employeeData/:parameter', async (req, res) => {
    const id=req.params.parameter;

    const employeeData = await Employee.findOne({_id:id}).select("-password");


    console.log(employeeData, 'printing employee data');

    res.send({
        success: true,
        array: {
            employeeData
        }
    });
    
});


router.patch('/update/:parameter', async (req, res) => {
    const id = req.params.parameter;
    let updatedDetails = req.body

    console.log(await  Employee.findOne({_id:id}), "before update" )

    await Employee.updateOne({_id:id},updatedDetails);

    console.log( await Employee.findOne({_id:id}), "after update" )

    res.send({
        success: true,
        detailsUpdated: {
            updatedDetails
        }
    });
});

router.delete('/deletion/:parameter', async (req, res) => {
    const id = req.params.parameter;
    

    console.log(await  Employee.find( ));

    await Employee.deleteOne({_id:id});

    console.log(await  Employee.find( ));

    res.send({
        success: true,
        status: 
            "deleted"
        
    });
});


module.exports = router;