const model = require('../models')
const jwtHandler = require('../jwtHandler');
class Employee {
    constructor(){

    }

    async login(req, res) {
        //Verify token here
        let user = await model.employee.get({$and : [{"email": req.body.email},{"password": req.body.password}]
                                                }, 
                                                {"email": 1,
                                                "firstName": 1,
                                                "lastName": 1,
                                                "totalExperience": 1,
                                                "phoneNo": 1,
                                                "_id": 1,
                                                "designation": 1
                                            });
        console.log(user);
        if(user != null || user != []){
            let token = jwtHandler.tokenGenerator(user);
            if(token != null){
                res.status(200).send(token);
            }
        }
        else{
            res.status(401).send("Unauthorized, Invalid Username or Password");
        }
    }
}
module.exports = new Employee();