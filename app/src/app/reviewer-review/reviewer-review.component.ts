import { ServicesService } from './../services.service';
import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef, AfterViewInit  } from '@angular/core';



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
    this.assessmentSelfTS=this.reviewArray.technicalSkill.selfEvaluation.assessment;
    this.reviewReviewerTS= this.reviewArray.technicalSkill.reviewerEvaluation.comment;
    this.assessmentReviewerTS= this.reviewArray.technicalSkill.reviewerEvaluation.assessment;
    this.reviewSelfCS= this.reviewArray.communication.selfEvaluation.comment;
    this.assessmentSelfCS=this.reviewArray.communication.selfEvaluation.assessment;
    this.reviewReviewerCS= this.reviewArray.communication.reviewerEvaluation.comment;
    this.assessmentReviewerCS= this.reviewArray.communication.reviewerEvaluation.assessment;
    this.reviewSelfP= this.reviewArray.personality.selfEvaluation.comment;
    this.assessmentSelfP=this.reviewArray.personality.selfEvaluation.assessment;
    this.reviewReviewerP= this.reviewArray.personality.reviewerEvaluation.comment;
    this.assessmentReviewerP= this.reviewArray.personality.reviewerEvaluation.assessment;
    }


    updateReviewDetails(){
      let userObj = {
        "technicalSkill": {
          "selfEvaluation": {
              "comment": this.rsTS.nativeElement.value,
              "assessment": " Needs Improvement"
          },
          "reviewerEvaluation": {
              "comment": this.rrTS.nativeElement.value,
              "assessment": "Needs Improvement"
          }
        },
       "communication": {
         "selfEvaluation": {
             "comment": this.rsCS.nativeElement.value,
             "assessment": " Needs Improvement"
          },
        "reviewerEvaluation": {
            "comment": this.rrCS.nativeElement.value,
            "assessment": "Needs Improvement"
        }
    },
    "personality": {
      "selfEvaluation": {
          "comment": this.rsP.nativeElement.value,
          "assessment": " Needs Improvement"
      },
      "reviewerEvaluation": {
          "comment": this.rrP.nativeElement.value,
          "assessment": "Needs Improvement"
      }
  }

  }
      console.log(userObj);
      this._service.updateReviewData(userObj).subscribe(res =>  {
        console.log(this.res);
        if(this.res.status==200){
          console.log('Successful update!!');
    
        }
        else {
          console.log('unsuccessful');
         
        }
    
    });
      
      
    }
}
