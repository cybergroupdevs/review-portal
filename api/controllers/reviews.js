const config = require('config');

const model = require('../models');
const jwtHandler = require('../jwtHandler');
class Review {
    constructor(){

        console.log("reached controller")
    }
      
  async show(req,res){
        console.log("Reached SHOW");
        const review = await model.review.get({"_id": req.params.id})
        res.send(review[0]);
    }


async index(req,res){
    console.log("Reached INDEX");
    const reviewList = await model.review.get();
    res.send(reviewList);
}

async update(req,res) {
    let updateObj= req.body
    console.log(updateObj)
    const employee= await model.review.update({_id: req.params.parameter},  updateObj)
    res.send(employee)

}    
}
module.exports = new Review() 