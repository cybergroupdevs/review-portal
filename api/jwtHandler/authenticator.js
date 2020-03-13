const review = require("../models/review");

class authenticator {
    constructor(){
    }

    async getReviewData(reviewId){
        let data = await review.get({_id: reviewId});
        return(data);
    }

    async verifyMeOnUpdate(reviewId, userId, route){
        let reviewData = await this.getReviewData(reviewId);
        let tempreviewData = JSON.parse(reviewData);
        if(route == "pendingBySelf" && tempreviewData[0].employeeId._id == userId){
            return true;
        }
        else if(route == "pendingByReviewer" && tempreviewData[0].reviewer._id == userId){
            return true;
        }
        else if(route == "pendingByQa" && tempreviewData[0].qualityAnalyst._id == userId){
            return true;
        }
        else if(route == "closed" && tempreviewData[0].employeeId._id == userId){
            return true;
        }
        else{
            return false;
        }
    }
}
module.exports = new authenticator();