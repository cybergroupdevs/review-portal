const controller = require('../controllers');

module.exports = (app) => {

    //     const employee = new controller.employees()
    //     app.post("/test", (req,res) =>{
    //     console.log(req.body)
    //     res.send({session: `Testing HRMS`})
    // });
    app.get("/employees/:id",controller.employees.show)
    
}