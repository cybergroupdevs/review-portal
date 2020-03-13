import { Component, OnInit, ElementRef } from '@angular/core';
import { ViewChild, AfterViewInit } from '@angular/core';
import { ServicesService } from './../services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.scss']
})

export class CreateReviewComponent implements OnInit {

  constructor(private _service: ServicesService, private _router: Router) { }

  @ViewChild('empCgiCode', {static: false}) empCgiCode: ElementRef;
  @ViewChild('empFirstName', {static: false}) empFirstName: ElementRef;
  @ViewChild('empLastName', {static: false}) empLastName: ElementRef;
  @ViewChild('empDesignation', {static: false}) empDesignation: ElementRef;

  @ViewChild('formName', {static: false}) formName: ElementRef;
  @ViewChild('cycleName', {static: false}) cycle: ElementRef;
  
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
  inputValue: string;
  reviewCycle1: string;
  reviewCycle2: string;
  isVisible : Boolean = false;
  isShow :Boolean=false;
  
  sendReq(cgiCodeValue){
    return this._service.getByCgiCode(cgiCodeValue);
  }

  ngOnInit() {  
    const empCgiCode = document.getElementById('empCgiCodeField');
    const reviewerCgiCode = document.getElementById('reviewerCgiCodeField');
    const qaerCgiCode = document.getElementById('qaerCgiCodeField');
    empCgiCode.addEventListener('input', this.setEmpDetails.bind(this)); 
    reviewerCgiCode.addEventListener('input', this.setReviewerDetails.bind(this));
    qaerCgiCode.addEventListener('input', this.setQaerDetails.bind(this));  

    let date = new Date(); 
    let year = date.getFullYear();
    this.reviewCycle1 = "Annual "+year;
    this.reviewCycle2 = "Mid Year "+year;
  }

  setEmpDetails(e){
    let empCgiCodeValue = e.target.value;
    this.sendReq(empCgiCodeValue).subscribe( res => {
      if(res.status == 200){
        this.userArray = res.body[0];
        if(res.body[0] == null){
          this.clearData(0);
        }
        else{
          this.setEmployeeData();
        }
      }
      else if(res.status == 401){
        localStorage.removeItem("JwtHrms");
        this._router.navigate(['/login']);
      }
    });
  }

  setReviewerDetails(e){
    let reviewerCgiCodeValue = e.target.value;
    this.sendReq(reviewerCgiCodeValue).subscribe( res => {
      if(res.status == 200){
        this.userArray = res.body[0];
        if(res.body[0] == null){
          this.clearData(1);
        }
        else{
          this.setReviewerData();
        }
      }
      else if(res.status == 401){
        localStorage.removeItem("JwtHrms");
        this._router.navigate(['/login']);
      }
      
    });
  }

  setQaerDetails(e){
    let qaerCgiCodeValue = e.target.value;
    this.sendReq(qaerCgiCodeValue).subscribe( res => {
      if(res.status == 200){
        this.userArray = res.body[0];
        if(res.body[0] == null){
          this.clearData(2);
        }
        else{
          this.setQaerData();
        }
      }
      else if(res.status == 401){
        localStorage.removeItem("JwtHrms");
        this._router.navigate(['/login']);
      }
    });
  }

  setEmployeeData(){
    this.empFirstName.nativeElement.value = this.userArray.firstName;
    this.empLastName.nativeElement.value = this.userArray.lastName;
    this.empDesignation.nativeElement.value = this.userArray.designation;
    var empID = this.userArray._id;
    this.employeeId = empID;
  }

  setReviewerData(){
    this.reviewerFirstName.nativeElement.value = this.userArray.firstName;
    this.reviewerLastName.nativeElement.value = this.userArray.lastName;
    this.reviewerDesignation.nativeElement.value = this.userArray.designation;
    var rId = this.userArray._id;
    this.reviewerId = rId;;
  }

  setQaerData(){
    this.qaerFirstName.nativeElement.value = this.userArray.firstName;
    this.qaerLastName.nativeElement.value = this.userArray.lastName;
    this.qaerDesignation.nativeElement.value = this.userArray.designation;
    var qId = this.userArray._id;
    this.qaerId = qId;
  }

  checkInput(){
    if(this.empFirstName.nativeElement.value == "" || this.empLastName.nativeElement.value == ""|| this.empDesignation.nativeElement.value == ""|| this.reviewerFirstName.nativeElement.value == ""|| this.reviewerLastName.nativeElement.value == ""|| this.reviewerDesignation.nativeElement.value == ""|| this.qaerFirstName.nativeElement.value == ""|| this.qaerLastName.nativeElement.value == ""|| this.qaerDesignation.nativeElement.value == ""|| this.cycle.nativeElement.value == ""|| this.formName.nativeElement.value == ""|| this.empCgiCode.nativeElement.value == ""|| this.reviewerCgiCode.nativeElement.value == ""|| this.qaerCgiCode.nativeElement.value == "" || this.cycle.nativeElement.value=="" || this.formName.nativeElement.value==""){
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
      return ; 
    }
    else {
      this.isVisible = true;     
    }
  }

  createReview(){
    this.isVisible = false
    let reviewObject = {
      employeeId: this.employeeId,
      reviewer: this.reviewerId,
      qualityAnalyst: this.qaerId,
      reviewCycle: this.cycle.nativeElement.value,
      formName: this.formName.nativeElement.value,
    };
    
    this._service.createReview(reviewObject).subscribe(res => {
      if(res.status == 200){
        this.isShow = true;
          setTimeout(()=> { 
            this._router.navigate(["/admin/home"]);
            this.isShow = false;
          }, 1000);
      }
      else if(res.status == 401){
        localStorage.removeItem("JwtHrms");
        this._router.navigate(['/login']);
      }
      else{
        alert("Some Error Occured");
      }
    });
    this.inputValue = "";
  } 

  clearData(flag){
    if(flag == 0){
      this.empDesignation.nativeElement.value = "";
      this.empFirstName.nativeElement.value = "";
      this.empLastName.nativeElement.value = "";
    }
    else if(flag == 1){
      this.reviewerDesignation.nativeElement.value = "";
      this.reviewerFirstName.nativeElement.value = "";
      this.reviewerLastName.nativeElement.value = "";
    }
    else if(flag == 2){
      this.qaerFirstName.nativeElement.value = "";
      this.qaerLastName.nativeElement.value = "";
      this.qaerDesignation.nativeElement.value = "";
    }
  }

}