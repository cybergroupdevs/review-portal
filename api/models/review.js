const mongoose = require('mongoose');
const reviewSchema = require('../schemas/review').schema;
//const reviewSchema = mongoose.Schema(schema.review)

class Review{
    constructor(){
        this.model = mongoose.model('Review', reviewSchema)
    }

    async get(criteria={}, columns={}){
        let fields = 'cgiCode firstName lastName designation totalExperience';
        console.log(criteria);
        debugger
        //let reviewsdata = await this.model.find({"employeeId": '5e5f737d593eb50c6c524b8f'})
        let reviewsdata = await this.model.find({})
        this.model.find({employeeId: '5e5f737d593eb50c6c524b8f'}, function(err, docs){
            console.log("========================>>>>>>")
            console.log(docs);
         });

        console.log(reviewsdata)
        // let somevar = await this.model.find({$and: [ { employeeId: '5e5f737d593eb50c6c524b8f' }, { flag: '0' } ] }, columns, function(err,data){
        //     if(err){console.log(err);}
        //     console.log("=================")
        //     console.log(data)
        // });
        // //return this.model.find(criteria, columns).populate('employeeId', fields).populate('reviewer', fields).populate('qualityAnalyst', fields);
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