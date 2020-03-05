import { ReviewerQaerComponent } from './../reviewer-qaer/reviewer-qaer.component';
import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ServicesService } from './../services.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';


@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.scss']
})
export class CreateReviewComponent implements OnInit {

  constructor(private _service: ServicesService) { }


  @ViewChild('empCgiCode', {static: false}) empCgiCode: ElementRef;
  @ViewChild('empFirstName', {static: false}) empFirstName: ElementRef;
  @ViewChild('empLastName', {static: false}) empLastName: ElementRef;
  @ViewChild('empDesignation', {static: false}) empDesignation: ElementRef;
  @ViewChild('formName', {static: false}) formName: ElementRef;
  @ViewChild('cycle', {static: false}) cycle: ElementRef;
  @ViewChild('reviewerCgiCode', {static: false}) reviewerCgiCode: ElementRef;
  @ViewChild('reviewerFirstName', {static: false}) reviewerFirstName: ElementRef;
  @ViewChild('reviewerLastName', {static: false}) reviewerLastName: ElementRef;
  @ViewChild('reviewerDesignation', {static: false}) reviewerDesignation: ElementRef;
  @ViewChild('qaerCgiCode', {static: false}) qaerCgiCode: ElementRef;
  @ViewChild('qaerFirstName', {static: false}) qaerFirstName: ElementRef;
  @ViewChild('qaerLastName', {static: false}) qaerLastName: ElementRef;
  @ViewChild('qaerDesignation', {static: false}) qaerDesignation: ElementRef;
  
  
  res:any;
  userArray: any;

  employeeId: any;
  reviewerId: any;
  qaerId: any;

  sendReq(cgiCodeValue){
    return this._service.getByCgiCode(cgiCodeValue);
  }

  ngOnInit() {
    // const input = document.querySelector('input');
    const empCgiCode = document.getElementById('empCgiCodeField');
    const reviewerCgiCode = document.getElementById('reviewerCgiCodeField');
    const qaerCgiCode = document.getElementById('qaerCgiCodeField');
    empCgiCode.addEventListener('input', this.setEmpDetails.bind(this)); 
    reviewerCgiCode.addEventListener('input', this.setReviewerDetails.bind(this));
    qaerCgiCode.addEventListener('input', this.setQaerDetails.bind(this));  

  }

  setEmpDetails(e){
    console.log(e.target.value);
    let empCgiCodeValue = e.target.value;
    this.sendReq(empCgiCodeValue).subscribe( res => {
      this.userArray =res[0]
      this.setEmployeeData()
     
    });
  }

  setReviewerDetails(e){
    console.log(e.target.value);
    let reviewerCgiCodeValue = e.target.value;
    this.sendReq(reviewerCgiCodeValue).subscribe( res => {
      this.userArray =res[0]
      this.setReviewerData()
    });
  }

  setQaerDetails(e){
    console.log(e.target.value);
    let qaerCgiCodeValue = e.target.value;
    this.sendReq(qaerCgiCodeValue).subscribe( res => {
      this.userArray =res[0]
      this.setQaerData()
    });
  }

  setEmployeeData(){
    console.log("set employee data")
    console.log(this.userArray.firstName)
    this.empFirstName.nativeElement.value = this.userArray.firstName;
    this.empLastName.nativeElement.value = this.userArray.lastName;
    this.empDesignation.nativeElement.value = this.userArray.designation;
    var empID = this.userArray._id;
    this.employeeId = empID;
  }

  setReviewerData(){
    console.log("set reviwer data")
    console.log(this.userArray.firstName)
    this.reviewerFirstName.nativeElement.value = this.userArray.firstName;
    this.reviewerLastName.nativeElement.value = this.userArray.lastName;
    this.reviewerDesignation.nativeElement.value = this.userArray.designation;
    var rId = this.userArray._id;
    this.reviewerId = rId;;
  
  }
  setQaerData(){
    console.log("set reviwer data")
    console.log(this.userArray.firstName)
    this.qaerFirstName.nativeElement.value = this.userArray.firstName;
    this.qaerLastName.nativeElement.value = this.userArray.lastName;
    this.qaerDesignation.nativeElement.value = this.userArray.designation;
    var qId = this.userArray._id;
    this.qaerId = qId;
  }

  printID(){
    console.log("########### printID ###################");
    let reviewObject = {
      employeeId: this.employeeId,
      reviewer: this.reviewerId,
      qaer: this.qaerId
    }
    console.log(reviewObject)
  }
  
  createReview(){
    // let reviewObject = {
    //   employeeId: this.employeeId,
    //   reviewer: this.reviewerId,
    //   qualityAnalyst: this.qaerId,
    //   reviewCycle: this.cycle.nativeElement.value,
    //   formName: this.formName.nativeElement.value,
    // }
    // console.log(reviewObject);
    // this._service.createReview(reviewObject).subscribe(res => this.res = res);
    // console.log(this.res);
    // if (this.res.status==200){

    // }
    // else{
    //   console.log("error occured");
    // }
    console.log("review created")
  }

}
