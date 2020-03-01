import { ServicesService } from './../services.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reviewer-review',
  templateUrl: './reviewer-review.component.html',
  styleUrls: ['./reviewer-review.component.scss']
})
export class ReviewerReviewComponent implements OnInit {
  res:any;
  constructor(private _service : ServicesService) { }
  reviewArray:any;
  reviewSelfTS:String;
  assessmentSelfTS: String;
  reviewReviewerTS: String;
  assessmentReviewerTS: String;
  reviewSelfCS:String;
  assessmentSelfCS: String;
  reviewReviewerCS: String;
  assessmentReviewerCS: String;
  reviewSelfP:String;
  assessmentSelfP: String;
  reviewReviewerP: String;
  assessmentReviewerP: String;

  ngOnInit() {
    this.loadExistingData()
  }
  loadExistingData(){
    this._service.reviewData().subscribe(res => {
      console.log(res);
      
      this.reviewArray = res;
      console.log(this.reviewArray)
      this.setExistingData();

    });

  }
  setExistingData(){
    console.log(this.reviewArray);
    this.reviewSelfTS= this.reviewArray.technicalSkill.selfEvaluation.comment;
    //console.log(this.reviewSelfTS)
    this.assessmentSelfTS=this.reviewArray.technicalSkill.selfEvaluation.assessment;
    this.reviewReviewerTS= this.reviewArray.technicalSkill.reviewerEvaluation.comment;
    //console.log(this.reviewReviewerTS)
    this.assessmentReviewerTS= this.reviewArray.technicalSkill.reviewerEvaluation.assessment;
    this.reviewSelfCS= this.reviewArray.technicalSkill.selfEvaluation.comment;
    this.assessmentSelfCS=this.reviewArray.technicalSkill.selfEvaluation.assessment;
    this.reviewReviewerCS= this.reviewArray.technicalSkill.reviewerEvaluation.comment;
    this.assessmentReviewerCS= this.reviewArray.technicalSkill.reviewerEvaluation.assessment;
    this.reviewSelfP= this.reviewArray.technicalSkill.selfEvaluation.comment;
    this.assessmentSelfP=this.reviewArray.technicalSkill.selfEvaluation.assessment;
    this.reviewReviewerP= this.reviewArray.technicalSkill.reviewerEvaluation.comment;
    this.assessmentReviewerP= this.reviewArray.technicalSkill.reviewerEvaluation.assessment;
    
    
    }
}
