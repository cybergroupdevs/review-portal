const model = require('../models')
class Employee {
    constructor(){
 console.log("reached Employee Controller");
    }

    async show(req,res){
        console.log("Reached SHOW");
        const employee = await model.employee.get({"_id": req.params.id})
        res.send(employee);
    }

}
module.exports = new Employee() 