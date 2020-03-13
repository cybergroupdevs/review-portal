const controller = require('../controllers');
module.exports=(app) =>
{ 
    app.get("/employees", controller.employees.index);

    app.patch("/employee/:parameter",controller.employees.update);

    app.post("/employee",controller.employees.create);

    app.get("/employee/:id",controller.employees.show);

    app.get("/employeeByName/:name", controller.employees.searchEmployee);

    app.get("/employeeData/:cgiCode", controller.employees.getEmployeeDetails);


    app.post("/login", controller.employees.login);


    app.post("/review", controller.reviews.createReview);

    app.get("/review", controller.reviews.show);

    app.get("/review/:id", controller.reviews.getById);

    app.get("/reviewCount", controller.reviews.getReviewCount);

    app.patch("/review/:id", controller.reviews.update);

}