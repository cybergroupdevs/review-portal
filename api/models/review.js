const mongoose = require('mongoose');
const reviewSchema = require('../schemas/review').schema;

class Review{
    constructor(){
        this.model = mongoose.model('Review', reviewSchema)
    }

    async getCount(criteria = {}){
        let resultArray = [];
        for(let flag=0; flag<4; flag++){
            resultArray[flag] = await this.model.count({"flag": flag.toString()});
        }
        return resultArray;
    }

    async get(criteria={}, columns={}){
        let fields = 'cgiCode firstName lastName designation totalExperience joined';
        let reviewdata = await this.model.find(criteria, columns).populate('employeeId', fields).populate('reviewer', fields).populate('qualityAnalyst', fields);
        return (JSON.stringify(reviewdata));
    }
    
    async update(criteria={}, updateObj){
        return this.model.update(criteria, updateObj)
    }

    async save(reviewObject){
        return this.model.create(reviewObject)
    }
}

module.exports = new Review();