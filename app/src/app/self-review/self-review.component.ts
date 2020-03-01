import { Component, OnInit } from '@angular/core';
import { ServicesService } from './../services.service';

@Component({
  selector: 'app-self-review',
  templateUrl: './self-review.component.html',
  styleUrls: ['./self-review.component.scss']
})
export class SelfReviewComponent implements OnInit {

  constructor(private _service: ServicesService) { }
  reviewArray: any;
  reviewSelfTS:String;
  assessmentSelfTS: String;
  reviewSelfCS:String;
  assessmentSelfCS: String;
  reviewSelfPS:String;
  assessmentSelfPS: String;
  ngOnInit() {
    const id = "5e5bc9889dafbe6380096ca6";
    this.getReview(id);
  }

  getReview(id:any) {
    this._service.getReviewById(id)
      .subscribe(res => {
        this.reviewArray = res;
        //console.log(this.reviewArray ,  "my dataaaaaaaaaaaaaa");

        this.reviewSelfTS= this.reviewArray.technicalSkill.selfEvaluation.comment;
    
    this.assessmentSelfTS=this.reviewArray.technicalSkill.selfEvaluation.assessment;
    this.reviewSelfCS= this.reviewArray.communication.selfEvaluation.comment;
    
    this.assessmentSelfCS=this.reviewArray.communication.selfEvaluation.assessment;
    this.reviewSelfPS= this.reviewArray.personality.selfEvaluation.comment;
    
    this.assessmentSelfPS=this.reviewArray.personality.selfEvaluation.assessment;

      });
  }

}
