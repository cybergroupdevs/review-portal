const config = require('config');

const model = require('../models');
const jwtHandler = require('../jwtHandler');

class Review {
    constructor(){

        console.log("reached controller")
    }
      
  async show(req,res){
        console.log(req.params.id);
        const review = await model.review.get({"employeeId": req.params.id})
        console.log(review);
        res.send(review[0]);
    }

    async update(req,res) {
        console.log("Reached UPDATE");
        let updateObj= req.body
        console.log(updateObj)
        const review= await model.review.update({_id: req.params.parameter},  updateObj)
        res.send(review)
    }  
    async createReview(req, res) {
        let addReview={
            employeeId: req.body.employeeId,
            reviewer: req.body.reviewer,
            qualityAnalyst: req.body.qualityAnalyst,
            // firstName: req.body.firstName,
            // lastName: req.body.lastName,
            // email: req.body.email,
            // cgiCode: req.body.cgiCode,
            // reviewer: req.body.reviewer,
            // qualityAnalyst: req.body.qualityAnalyst
        }
        console.log("reached create review")
        const review = await model.review.save(addReview)
        res.send(review)
    }
    
    async getByCgiCode(req,res){
        console.log("Reached Get CGI Code");
        const reviewValues = await model.review.get({"cgiCode": req.params.cgiCode})
        res.send(reviewValues);
    }
}

module.exports = new Review() 