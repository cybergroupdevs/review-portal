import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ServicesService } from './../services.service';
import { ViewChild, ElementRef, AfterViewInit  } from '@angular/core';

import $ from "jquery";


@Component({
  selector: 'app-reviewer-review',
  templateUrl: './reviewer-review.component.html',
  styleUrls: ['./reviewer-review.component.scss']
})
export class ReviewerReviewComponent implements OnInit {
  res:any;
  @ViewChild('rsTS', {static: false}) rsTS: ElementRef;
  @ViewChild('rrTS', {static: false}) rrTS: ElementRef;
  @ViewChild('rsCS', {static: false}) rsCS: ElementRef;
  @ViewChild('rrCS', {static: false}) rrCS: ElementRef;
  @ViewChild('rsP', {static: false}) rsP: ElementRef;
  @ViewChild('rrP', {static: false}) rrP: ElementRef;
  
  constructor(private _service : ServicesService, private _activatedRoute: ActivatedRoute, private _router: Router) { }
  
  reviewArray:any;

  reviewSelfTS: String;
  assessmentSelfTS: String;
  
  reviewReviewerTS: String;
  assessmentReviewerTS: String;
  
  reviewSelfCS: String;
  assessmentSelfCS: String;
  
  reviewReviewerCS: String;
  assessmentReviewerCS: String;
  
  reviewSelfP: String;
  assessmentSelfP: String;
  
  reviewReviewerP: String;
  assessmentReviewerP: String;

  reviewId: string;

  isReadonly = false;
  editable = false;
  current_route: string;

  ngOnInit() {
    this._activatedRoute.params.subscribe(param => {
      console.log(param.id);
      this.reviewId = param.id;
    });
    this.current_route = this._router.url.split('/')[2];
    if(this.current_route == "closed"){
      this.isReadonly = true;
      this.editable = true;
    }
    this.loadExistingData();
  }

  loadExistingData(){
    this._service.reviewDataById(this.reviewId, this.current_route).subscribe(res => {
      console.log(res.status);
      console.log(res);
      if(res.status == 200){
        this.reviewArray = res.body[0];
        if(this.reviewArray.flag == "3"){
          this.isReadonly = true;
          this.editable = true;
        }
        console.log(this.reviewArray)
        this.setExistingData();
      }
      else if(res.status == 404){
        this._router.navigate(['/404']);
      }
      else if(res.status == 401){
        localStorage.removeItem("JwtHrms");
        this._router.navigate(['/login']);
      }
    });
  }

  setExistingData(){
    console.log(this.reviewArray);
    this.reviewSelfTS = this.reviewArray.technicalSkill.selfEvaluation.comment;
    this.assessmentSelfTS = this.reviewArray.technicalSkill.selfEvaluation.assessment;
    this.reviewReviewerTS = this.reviewArray.technicalSkill.reviewerEvaluation.comment;
    this.assessmentReviewerTS = this.reviewArray.technicalSkill.reviewerEvaluation.assessment;

    this.reviewSelfCS = this.reviewArray.communication.selfEvaluation.comment;
    this.assessmentSelfCS = this.reviewArray.communication.selfEvaluation.assessment;
    this.reviewReviewerCS = this.reviewArray.communication.reviewerEvaluation.comment;
    this.assessmentReviewerCS = this.reviewArray.communication.reviewerEvaluation.assessment;

    this.reviewSelfP = this.reviewArray.personality.selfEvaluation.comment;
    this.assessmentSelfP = this.reviewArray.personality.selfEvaluation.assessment;
    this.reviewReviewerP = this.reviewArray.personality.reviewerEvaluation.comment;
    this.assessmentReviewerP = this.reviewArray.personality.reviewerEvaluation.assessment;
  }

  updateReviewDetails(){
    let userObj = {
      "technicalSkill": {
        "selfEvaluation": {
          "comment": this.reviewSelfTS,
          "assessment": this.assessmentSelfTS
        },
        "reviewerEvaluation": {
          "comment": this.reviewReviewerTS,
          "assessment": this.assessmentReviewerTS
        }
      },
      "communication": {
        "selfEvaluation": {
          "comment": this.reviewSelfCS,
          "assessment": this.assessmentSelfCS
        },
        "reviewerEvaluation": {
          "comment": this.reviewReviewerCS,
          "assessment": this.assessmentReviewerCS
        }
      },
      "personality": {
        "selfEvaluation": {
          "comment": this.reviewSelfP,
          "assessment": this.assessmentSelfP
        },
        "reviewerEvaluation": {
          "comment": this.reviewReviewerP,
          "assessment": this.assessmentReviewerP
        }
      }
    }
    console.log(userObj);
    this._service.updateSelfReview(this.reviewId, userObj).subscribe(res =>  {
      console.log(res);
      if(res.status == 200){
        console.log('Successful update!!');   
      }
      else if(res.status == 401){
        console.log('unsuccessful');
      }
    });
  }

  selectChangeHandler(event: any){
    this.assessmentReviewerTS = event.target.value;
  }
  
  selectChangeHandlerCS(event: any){
    this.assessmentReviewerCS = event.target.value;
  }

  selectChangeHandlerP(event: any){
    this.assessmentReviewerP = event.target.value;
  }

  submitReviewDetails(){
    this.updateReviewDetails();
    let reviewObj;
    if(this.current_route == "pendingByReviewer"){
      reviewObj = {
        "flag": "2",
        "status": "Pending-QAer"
      }
    }
    else if(this.current_route == "pendingByQa"){
      reviewObj = {
        "flag": "3",
        "status": "Close"
      }
    }
    console.log("Flag Object------------------>>>>>>>>", reviewObj);
    this._service.updateSelfReview(this.reviewId, reviewObj).subscribe(res =>  {
      console.log(res);
      if(res.status == 200){
        console.log('Successful update!!');
        
          $("#submitVerficationModel").show();
          setTimeout(()=> { 
          
          this._router.navigate(["/user/reviews"]);
          $('#submitVerficationModel').hide()
          }, 1000);
          
      }
      else {
        console.log('unsuccessful');
      }
    });
    
  }
}