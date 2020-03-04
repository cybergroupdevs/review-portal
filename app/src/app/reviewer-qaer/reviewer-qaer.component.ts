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
  reviewerName: string=null;
  designation: string=null;
  joined:Date=null;
  totalExperience:number=null;
  revieweeName: string=null;
  qaerName: string=null;
  reviewCycle: number=null;
 
  
   ngOnInit() {
     this.loadData()
 }
 loadData(){
  this._service.reviewerData().subscribe(res => {
  
    console.log(res);

    this.reviewQaerArray = res;
    console.log(this.reviewQaerArray);
    this.setData();
  });

  this._service.employeeData().subscribe(res=> {
    console.log(res);

    this.reviewQaerArray = res;
    console.log(this.reviewQaerArray)
    this.setData();
});
}

// onChange(ev) {
//   console.log(ev);
// }
setData(){
  this.empCode= this.reviewQaerArray.cgiCode;
  this.reviewerName=this.reviewQaerArray.reviewerName;
  this.joined=this.reviewQaerArray.joined;
  this.totalExperience=this.reviewQaerArray.totalExperience;
  this.revieweeName=this.reviewQaerArray.firstName;
  this.qaerName=this.reviewQaerArray.qaerName;
  this.designation=this.reviewQaerArray.designation;
  this.reviewCycle=this.reviewQaerArray.reviewCycle;
 }

}
