import { Component, OnInit } from '@angular/core';
import { ServicesService } from './../services.service';
import { ViewChild, ElementRef, AfterViewInit  } from '@angular/core';


@Component({
  selector: 'app-self-review',
  templateUrl: './self-review.component.html',
  styleUrls: ['./self-review.component.scss']
})
export class SelfReviewComponent implements OnInit {
  res:any;
  @ViewChild('rsTS', {static: false}) rsTS: ElementRef;
  @ViewChild('rsCS', {static: false}) rsCS: ElementRef;
  @ViewChild('rsP', {static: false}) rsP: ElementRef;

  constructor(private _service: ServicesService) { }
  
  reviewArray: any;
  reviewSelfTS:String;
  assessmentSelfTS: String;
  reviewSelfCS:String;
  assessmentSelfCS: String;
  reviewSelfPS:String;
  assessmentSelfPS: String;
  array : Object;
  id = "5e5bc9889dafbe6380096ca6";

  ngOnInit() {
    console.log("inside oninit")
    
    this.getReview(this.id);
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

  submitReview(){
    let reviwObj =  {
      "submitted" :true
    }
    this._service.updateSelfReview(this.id, reviwObj).subscribe(res =>  {
      console.log(this.res , "this is res");
      if(this.res.status==200){
        console.log('Successful update!!');
    
      }
      else {
        console.log('unsuccessful');
       
      }
    
    });
    this.updateSelfReview();

  }

  updateSelfReview(){
    console.log((this.rsTS , "idhar dekh"));
    let reviwObj = {
      "technicalSkill": {
        "selfEvaluation": {
        
          
            "comment": this.rsTS.nativeElement.value,
            "assessment": " Needs Improvement"
        },
        
      },
     "communication": {
       "selfEvaluation": {
           "comment": this.rsCS.nativeElement.value,
           "assessment": " Needs Improvement"
        },
      
    },
  "personality": {
    "selfEvaluation": {
        "comment": this.rsP.nativeElement.value,
        "assessment": " Needs Improvement"
    }
    
  }

}
console.log(reviwObj);
this._service.updateSelfReview(this.id, reviwObj).subscribe(res =>  {
  console.log(this.res , "this is res");
  if(this.res.ok==1){
    console.log('Successful update!!');

  }
  else {
    console.log('unsuccessful');
   
  }

});


}
}
