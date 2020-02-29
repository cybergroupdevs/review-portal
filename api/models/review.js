const mongoose = require('mongoose');
const reviewSchema = require('../schemas/review').schema;
//const reviewSchema = mongoose.Schema(schema.review)

class Review{
    constructor(){
        this.model = mongoose.model('Review', reviewSchema)
    }

    async get(criteria={}){
        return this.model.find(criteria)
    }
    
    
    async update(criteria={}, updateObj){
        return this.model.update(criteria, updateObj)
    }
    // async delete(criteria={})
    // {
    //     return this.model.deleteOne(criteria)
    // }
}

module.exports = new Review();