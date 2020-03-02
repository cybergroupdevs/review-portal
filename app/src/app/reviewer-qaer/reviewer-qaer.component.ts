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
  empCode: String;
  reviewerName: String;
  rDesignation: String;
  divisionName: String;
  rJoined:Date;
  rcgExperience:number;
  empName: String;
  qaerName: String;
  eDesignation: String;
  reviewCycle: String;
  promotionCycle: String;
  ecgExperience: number;
 
  
   ngOnInit() {
     this.loadData()
 }
 loadData(){
  // this._service.reviewerData().subscribe(res => {
  
  //   console.log(res);

  //   this.reviewQaerArray = res;
  //   console.log(this.reviewQaerArray)
  //   this.setData();
  // });
  this._service.empData().subscribe(res=> {
    console.log(res);

    this.reviewQaerArray = res;
    console.log(this.reviewQaerArray)
    this.setData();
});
}
setData(){
  this.empCode= this.reviewQaerArray.empCode;
  this.reviewerName=this.reviewQaerArray.reviewerName;
  this. rDesignation =this.reviewQaerArray. rDesignation;
  this.divisionName=this.reviewQaerArray.divisionName;
  this.rJoined=this.reviewQaerArray.rJoined;
  this.rcgExperience=this.reviewQaerArray.rcgExperience;
  this.empName=this.reviewQaerArray.empName;
  this.qaerName=this.reviewQaerArray.qaerName;
  this.eDesignation=this.reviewQaerArray.eDesignation;
  this.reviewCycle=this.reviewQaerArray.reviewCycle;
  this.promotionCycle=this.reviewQaerArray.promotionCycle;
  this.ecgExperience=this.reviewQaerArray.ecgExperience;
 }

}
