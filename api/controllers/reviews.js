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
}

module.exports = new Review() 