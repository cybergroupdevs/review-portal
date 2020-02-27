const model = require('../models')
class Employee {
    constructor(){

    }

    jsonDecoder = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    };

    async login(req, res) {
        //Verify token here
        if(/*token is valid*/true){
            token = "knknkdksnainlasnndoidknkasnddoidknokndskdoisn"
            decodedJson = this.jsonDecoder(token);
            if(decodedJson.Designation == "Admin"){
                //do some task according to admin
                responseData = await model.employee.get({});
                res.status(200).send("Successful");
            }
            else{
                //do some task according to user
            }
        }
        else{
            res.status(401).send("Unauthorized");
        }
    }
}
module.exports = new Employee();