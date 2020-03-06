import { Component, OnInit } from '@angular/core';
import { ServicesService } from './../services.service';
import { ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reviewer-qaer',
  templateUrl: './reviewer-qaer.component.html',
  styleUrls: ['./reviewer-qaer.component.scss']
})
export class ReviewerQaerComponent implements OnInit {
  res:any;
  constructor(private _service: ServicesService, private _activatedRoute: ActivatedRoute) { }
  
  reviewQaerArray: any;
  empCode: string = null;
  reviewer: string=null;
  designation: string=null;
  joined:Date=null;
  totalExperience:number=null;
  revieweeName: string=null;
  qualityAnalyst: string=null;
  reviewCycle: string=null;
 
  reviewId: string;
  
    ngOnInit() {
      this.loadData();
    }

    loadData(){
      this._activatedRoute.params.subscribe(param => {
        console.log(param.id);
        this.reviewId = param.id;
      });
      this._service.reviewerData(this.reviewId).subscribe(res => {
        console.log(res);
        this.reviewQaerArray = res[0];
        console.log(this.reviewQaerArray);
        this.setData();
      });
    }

// onChange(ev) {
//   console.log(ev);
// }
setData(){
  this.empCode = this.reviewQaerArray.employeeId.cgiCode;
  this.reviewer = this.reviewQaerArray.reviewer.firstName + " " + this.reviewQaerArray.reviewer.lastName;
  this.joined = this.reviewQaerArray.employeeId.joined;
  this.totalExperience = this.reviewQaerArray.reviewer.totalExperience;
  this.revieweeName = this.reviewQaerArray.employeeId.firstName + " " + this.reviewQaerArray.employeeId.lastName;
  this.qualityAnalyst = this.reviewQaerArray.qualityAnalyst.firstName + " " + this.reviewQaerArray.qualityAnalyst.lastName;
  this.designation = this.reviewQaerArray.employeeId.designation;
  this.reviewCycle = this.reviewQaerArray.employeeId.reviewCycle;
 }

}
