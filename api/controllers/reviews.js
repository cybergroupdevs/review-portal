const config = require('config');

const model = require('../models');
const jwtHandler = require('../jwtHandler');

class Review {
    constructor(){
        console.log("reached controller")
    }

    async getReviewCount(req, res){
        if(jwtHandler.tokenVerifier(req.headers.token)){
            const count = await model.review.getCount();
            res.status(200).send(count);
        }
        else{
            res.status(401).send({
                "message": "Unauthorized"
            });
        }
    }

    async getById(req,res){
        let decodedToken = await jwtHandler.tokenVerifier(req.headers.token);
        console.log("99999999999999999999999", decodedToken.data._id);
        console.log("88888888888888888888888", req.query["route"]);
        console.log("77777777777777777777777",req.params.id);
        if(decodedToken){
            console.log("Token is verified");
            let data = await jwtHandler.authenticator.verifyMeOnUpdate(req.params.id, decodedToken.data._id, req.query["route"]);
            console.log(data);
            if(data){
                const reviewData = await model.review.get({"_id": req.params.id});
                res.status(200).send(reviewData);
            }
            else{
                res.status(404).send({
                    "message": "Page Not Found"
                });
            }
        }
        else{
            res.status(401).send({
                "message": "Unauthorized"
            })
        }
        
    }

    async show(req,res){
        if(jwtHandler.tokenVerifier(req.headers.token)){
            let arr = [];
            let criteria;
            let i = 0; 
            for (const key in req.query) {
                criteria = { };
                criteria[key] = req.query[key];
                arr[i] = criteria;
                i = i + 1;
            }    
            console.log(arr);
            const review = await model.review.get({$and : arr});
            console.log("Length 2", review);
            res.status(200).send(review);
        }
        else{
            res.status(401).send({
                "message": "UnAuthorized"
            });
        }
    }

    async update(req, res) {
        if(jwtHandler.tokenVerifier(req.headers.token)){
            console.log(req.body);
            const review = await model.review.update({"_id": req.params.id}, req.body);
            res.status(200).send({
                "message": "Updated",
                "Data": review
            });
        }
        else{
            res.status(401).send({
                "message": "Unauthorized"
            });
        }
        
    }  

    async createReview(req, res) {
        if(jwtHandler.tokenVerifier(req.headers.token)){
            console.log(req.body);
            let addReview={
                employeeId: req.body.employeeId,
                reviewer: req.body.reviewer,
                qualityAnalyst: req.body.qualityAnalyst,
                reviewCycle: req.body.reviewCycle,
                formName: req.body.formName
            };
            console.log("reached create review");
            const review = await model.review.save(addReview);
            res.status(200).send(review);
        }
        else{
            res.status(401).send({
                "message": "Unauthorized"
            });
        }
    }
    
    async getByCgiCode(req,res){
        console.log("Reached Get CGI Code");
        const reviewValues = await model.review.get({"cgiCode": req.params.cgiCode})
        res.send(reviewValues);
    }
}

module.exports = new Review();