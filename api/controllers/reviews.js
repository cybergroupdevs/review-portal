const config = require('config');

const model = require('../models');
const jwtHandler = require('../jwtHandler');

class Review {
    constructor(){
        console.log("reached controller")
    }
    // async show(req,res){
    //     const review = await model.review.get({"_id": req.params.id});
    //     console.log(review);
    //     res.send(review);
    // }

    async show(req,res){
        let arr = [];
        let criteria;
        let i = 0; 
        for (const key in req.query) {
            criteria = { };
            criteria[key] = req.query[key];
            arr[i] = criteria;
            i = i + 1;
        }        
        //console.log(arr);

        const review = await model.review.get({$and : arr});
        //console.log(review);
        res.send(review);
    }

    async update(req,res) {
        console.log("Reached UPDATE");
        let updateObj= req.body
        console.log(updateObj)
        let arr = [];
        let criteria;
        for (const key in req.query) {
            // console.log(key, req.query[key]);
            criteria = { };
            let i = 0;
            criteria[key] = req.query[key];
            arr[i] = criteria;
            i = i + 1;
        }        
        console.log(arr);
        const review= await model.review.update({$and : arr}, updateObj);
        res.send(review)
    }  

    async createReview(req, res) {
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
        res.send(review);
    }
    
    async getByCgiCode(req,res){
        console.log("Reached Get CGI Code");
        const reviewValues = await model.review.get({"cgiCode": req.params.cgiCode})
        res.send(reviewValues);
    }

}

module.exports = new Review();