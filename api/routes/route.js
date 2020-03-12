const controller = require('../controllers');
module.exports=(app) =>
{ 
    app.get("/employee/employeeList", controller.employees.index);
    app.patch("/employee/update/:parameter",controller.employees.update);
    app.post("/employee/signup",controller.employees.create);
    app.get("/employees/:id",controller.employees.show);
    app.post("/login", controller.employees.login);
    app.post("/review", controller.reviews.createReview);

    app.get("/review", controller.reviews.show);
    app.get("/review/:id", controller.reviews.getById);
    app.get("/reviewCount", controller.reviews.getReviewCount);

    app.get("/employeeByName/:name", controller.employees.searchEmployee);
    
    app.patch("/review/:id", controller.reviews.update);
    app.get("/employeeData/:cgiCode", controller.employees.getEmployeeDetails);
}