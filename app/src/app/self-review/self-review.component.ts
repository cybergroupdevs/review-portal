import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ServicesService } from './../services.service';
import { ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-self-review',
  templateUrl: './self-review.component.html',
  styleUrls: ['./self-review.component.scss']
})
export class SelfReviewComponent implements OnInit {
  message: any;
  res:any;
  @ViewChild('rsTS', {static: false}) rsTS: ElementRef;
  @ViewChild('rsCS', {static: false}) rsCS: ElementRef;
  @ViewChild('rsP', {static: false}) rsP: ElementRef;
  
  constructor(private _service: ServicesService, private _activatedRoute: ActivatedRoute, private _router: Router) { }
  
  reviewArray: any;
  reviewSelfTS: String;

  assessmentSelfTS: String;
  reviewSelfCS: String;

  assessmentSelfCS: String;
  reviewSelfPS: String;

  assessmentSelfPS: String;
  reviewId: string;

  selectedAssessmentTS: String = this.assessmentSelfTS;
  selectedAssessmentCS: String = this.assessmentSelfCS;
  selectedAssessmentPS: String = this.assessmentSelfPS;

  ngOnInit() {
    this._activatedRoute.params.subscribe(param => {
      console.log(param.id);
      this.reviewId = param.id;
    });
    this.loadExistingData(this.reviewId);
  }

  loadExistingData(reviewId: string){
    this._service.reviewData(reviewId, "_id", "0").subscribe(res => {
      console.log(res); 
      this.reviewArray = res[0];
      console.log(this.reviewArray)
      this.setExistingData();
    });
  }

  setExistingData(){
    this.reviewSelfTS= this.reviewArray.technicalSkill.selfEvaluation.comment;
    this.assessmentSelfTS=this.reviewArray.technicalSkill.selfEvaluation.assessment;
    
    this.reviewSelfCS= this.reviewArray.communication.selfEvaluation.comment;
    this.assessmentSelfCS=this.reviewArray.communication.selfEvaluation.assessment;
    
    this.reviewSelfPS= this.reviewArray.personality.selfEvaluation.comment;
    this.assessmentSelfPS=this.reviewArray.personality.selfEvaluation.assessment;
    
    this.selectedAssessmentTS= this.assessmentSelfTS;
    this.selectedAssessmentCS=this.assessmentSelfCS;
    this.selectedAssessmentPS=this.assessmentSelfPS;
  }

  submitReview(){
    let reviewObj =  {
      "flag": "1",
      "status": "Pending-Reviewer"
    }
    this._service.updateSelfReview(this.reviewId, reviewObj).subscribe(res =>  {
      console.log(this.res , "this is res");
      if(this.res.status == 200){
        console.log('Successful update!!');
        this._router.navigate(["/user/reviews"]);
      }
      else {
        console.log('unsuccessful');
      }
    });
    this.updateSelfReview();
  }

  updateSelfReview(){
    let reviewObj = {
      "technicalSkill": {
        "selfEvaluation": {
            "comment": this.reviewSelfTS,
            "assessment": this.assessmentSelfTS
        }
      },
     "communication": {
       "selfEvaluation": {
           "comment": this.reviewSelfCS,
           "assessment": this.assessmentSelfCS
        }
      },
      "personality": {
        "selfEvaluation": {
          "comment": this.reviewSelfPS,
          "assessment": this.assessmentSelfPS
        }
      }
    }
    console.log(reviewObj);
    this._service.updateSelfReview(this.reviewId, reviewObj).subscribe(res => {
      console.log(res);
      console.log("---------------------");
      console.log(res.status);
    });
  }

  selectChangeHandlerTS(event: any){
    this.assessmentSelfTS = event.target.value;
  }
  selectChangeHandlerCS(event: any){
    this.assessmentSelfCS = event.target.value;
  }
  selectChangeHandlerPS(event: any){
    this.assessmentSelfPS = event.target.value;
  }

}
