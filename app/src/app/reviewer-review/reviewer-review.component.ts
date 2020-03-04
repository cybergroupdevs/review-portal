import { Component, OnInit } from '@angular/core';
import { ServicesService } from './../services.service';
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

  selectedAssessment: String = this.assessmentReviewerTS
  selectedAssessmentCS: String = this.assessmentReviewerCS
  selectedAssessmentP: String = this.assessmentReviewerP

  ngOnInit() {
    this.loadExistingData()
  }
  loadExistingData(){

    this._service.reviewData(this._service.jsonDecoder(localStorage.getItem("JwtHrms")).data._id, "reviewer", "1").subscribe(res => {

      console.log(res);
      
      this.reviewArray = res[0];
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
              "assessment": this.assessmentSelfTS
          },
          "reviewerEvaluation": {
              "comment": this.rrTS.nativeElement.value,
              "assessment": this.selectedAssessment
          }
        },
       "communication": {
         "selfEvaluation": {
             "comment": this.rsCS.nativeElement.value,
             "assessment": this.assessmentSelfCS
          },
        "reviewerEvaluation": {
            "comment": this.rrCS.nativeElement.value,
            "assessment": this.selectedAssessmentCS
        }
    },
    "personality": {
      "selfEvaluation": {
          "comment": this.rsP.nativeElement.value,
          "assessment": this.assessmentSelfP
      },
      "reviewerEvaluation": {
          "comment": this.rrP.nativeElement.value,
          "assessment": this.selectedAssessmentP
      }
  }

  }
      console.log(userObj);
      this._service.updateReviewData(userObj).subscribe(res =>  {
        console.log(res);
        if(res!=''){
          console.log('Successful update!!');
    
        }
        else {
          console.log('unsuccessful');
         
        }
    
    });
      
      
    }
    selectChangeHandler(event: any){
      this.selectedAssessment = event.target.value;
    }
  
    selectChangeHandlerCS(event: any){
      this.selectedAssessmentCS = event.target.value;
    }

    selectChangeHandlerP(event: any){
      this.selectedAssessmentP = event.target.value;
    }
    submitReviewDetails(){
      let userObj =  {
        "submitted" :true
      }
      this._service.updateReviewData(userObj).subscribe(res =>  {
        console.log(res);
        if(this.res.status!=0){
          console.log('Successful update!!');
      
        }
        else {
          console.log('unsuccessful');
         
        }
        
      
      });
      this.updateReviewDetails();
  
    }
}
