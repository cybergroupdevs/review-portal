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
  reviewQaerArray2: any;
  empCode: string = null;
  reviewerName: string=null;
  rDesignation: string=null;
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
  this._service.reviewerData().subscribe(res => {
  
    console.log(res);

    this.reviewQaerArray = res;
    console.log(this.reviewQaerArray, "hiiiiii");
    this.setData();
  });

  this._service.employeeData().subscribe(res=> {
    console.log(res);

    this.reviewQaerArray = res;
    console.log(this.reviewQaerArray)
    this.setData();
});
}

onChange(ev) {
  console.log(ev);
}
setData(){
  this.empCode= this.reviewQaerArray.cgiCode;
  this.reviewerName=this.reviewQaerArray.reviewerName;
  this.rDesignation =this.reviewQaerArray.designation;
  this.divisionName=this.reviewQaerArray.divisionName;
  this.rJoined=this.reviewQaerArray.rJoined;
  this.rcgExperience=this.reviewQaerArray.rcgExperience;
  this.empName=this.reviewQaerArray.lastName;
  this.qaerName=this.reviewQaerArray.qaerName;
  this.eDesignation=this.reviewQaerArray.eDesignation;
  this.reviewCycle=this.reviewQaerArray.reviewCycle;
  this.promotionCycle=this.reviewQaerArray.promotionCycle;
  this.ecgExperience=this.reviewQaerArray.ecgExperience;
 }

}
