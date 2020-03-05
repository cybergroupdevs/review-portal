import { Component, OnInit } from '@angular/core';
import { ServicesService } from './../services.service';
import { ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reviewer-qaer',
  templateUrl: './reviewer-qaer.component.html',
  styleUrls: ['./reviewer-qaer.component.scss']
})
export class ReviewerQaerComponent implements OnInit {
  res:any;
  constructor(private _service:ServicesService) { }
  
  reviewQaerArray: any;
  empCode: string = null;
  reviewer: string=null;
  designation: string=null;
  joined:Date=null;
  totalExperience:number=null;
  revieweeName: string=null;
  qualityAnalyst: string=null;
  reviewCycle: string=null;
 
  
   ngOnInit() {
     this.loadData()
 }
 loadData(){

  this._service.reviewData(this._service.jsonDecoder(localStorage.getItem("JwtHrms")).data._id, "reviewer", "1").subscribe(res => {
  
    console.log(res);

    this.reviewQaerArray = res[0];
    console.log(this.reviewQaerArray);
    this.setData();
  });

//   this._service.employeeData().subscribe(res=> {
//     console.log(res);

//     this.reviewQaerArray = res;
//     console.log(this.reviewQaerArray)
//     this.setData();
// });
}

// onChange(ev) {
//   console.log(ev);
// }
setData(){
  this.empCode= this.reviewQaerArray.employeeId.cgiCode;
  this.reviewer=this.reviewQaerArray.reviewer.firstName;
  this.joined=this.reviewQaerArray.employeeId.joined;
  this.totalExperience=this.reviewQaerArray.reviewer.totalExperience;
  this.revieweeName=this.reviewQaerArray.employeeId.firstName;
  this.qualityAnalyst=this.reviewQaerArray.qualityAnalyst.firstName;
  this.designation=this.reviewQaerArray.reviewer.designation;
  this.reviewCycle=this.reviewQaerArray.reviewCycle;
 }

}
