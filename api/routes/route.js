const controller = require('../controllers');

module.exports = (app) => {
    app.post("/login", controller.employees.login);
}