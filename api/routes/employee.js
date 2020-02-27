
const controller = require('../controllers');
module.exports=(app) =>
{ 
    app.get("/employee/employeeList", controller.employee.index)
    app.delete("/employee/deletion/:parameter",controller.employee.delete)
    // app.get("/employee/:parameter",controller.employee.show)
    app.patch("/employee/update/:parameter",controller.employee.update)
    app.post("/employee/signup",controller.employee.create)

}

