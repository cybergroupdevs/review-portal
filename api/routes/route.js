const controller = require('../controllers');
module.exports=(app) =>
{ 
    app.get("/employee/employeeList", controller.employees.index);
    app.delete("/employee/deletion/:parameter",controller.employees.delete);
    app.patch("/employee/update/:parameter",controller.employees.update);
    app.post("/employee/signup",controller.employees.create);
    app.get("/employees/:id",controller.employees.show);
    app.post("/login", controller.employees.login);
    app.post("/review/create", controller.reviews.createReview);
    app.get("/review/:id", controller.reviews.show);
    app.patch("/reviews/update/:parameter", controller.reviews.update);
    app.get("/employeeData/:cgiCode", controller.employees.getEmployeeDetails);
}