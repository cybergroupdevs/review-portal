const mongoose = require('mongoose');
const reviewSchema = require('../schemas/review').schema;
//const reviewSchema = mongoose.Schema(schema.review)

class Review{
    constructor(){
        this.model = mongoose.model('Review', reviewSchema)
    }

    async get(criteria={}, columns={}){
        let fields = 'cgiCode firstName lastName designation totalExperience';
        return this.model.find(criteria, columns).populate('employeeId', fields).populate('reviewer', fields).populate('qualityAnalyst', fields);
    }
    
    async update(criteria={}, updateObj){
        return this.model.update(criteria, updateObj)
    }
    async save(reviewObject){
        return this.model.create(reviewObject)
    }
    // async delete(criteria={})
    // {
    //     return this.model.deleteOne(criteria)
    // }
}

module.exports = new Review();