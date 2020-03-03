const mongoose = require('mongoose');
const employeeSchema = require('../schemas/employee').schema;
//const employeeSchema = mongoose.Schema(schema.employee)

class Employee{
    constructor(){
        this.model = mongoose.model('Employee', employeeSchema)
    }

    async getUserData(criteria={}){
        
        return this.model.find(criteria).select("-password")
    }
    async get(criteria={}, columns={}){
        
        return this.model.find(criteria, columns)
    }
    async getEmp(criteria={}, columns={}){
        
        
        return this.model.find({"name": `/^$columns/i`}).exec(callback);
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