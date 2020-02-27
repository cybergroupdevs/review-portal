const controller = require('../controllers');
module.exports=(app) =>
{ 
    app.get("/employee/employeeList", controller.employees.index)
    app.delete("/employee/deletion/:parameter",controller.employees.delete)
    // app.get("/employee/:parameter",controller.employee.show)
    app.patch("/employee/update/:parameter",controller.employees.update)
    app.post("/employee/signup",controller.employees.create)


    app.get("/employees/:id",controller.employees.show)
    
    app.post("/login", controller.employees.login);

}