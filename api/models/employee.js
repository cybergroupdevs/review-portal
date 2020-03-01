const mongoose = require('mongoose');
const employeeSchema = require('../schemas/employee').schema;
//const employeeSchema = mongoose.Schema(schema.employee)

class Employee{
    constructor(){
        this.model = mongoose.model('Employee', employeeSchema)
    }

    async getUserData(criteria={}){
        console.log("mera get")
        return this.model.find(criteria).select("-password")
    }
    async get(criteria={}, columns={}){
        console.log("faizan ka get")
        return this.model.find(criteria, columns)

    }
    async save(employeeObj){
        return this.model.create(employeeObj)
    }
    async update(criteria={}, updateObj){
        return this.model.update(criteria, updateObj)
    }
    async delete(criteria={})
    {
        return this.model.deleteOne(criteria)
    }
}

module.exports = new Employee();