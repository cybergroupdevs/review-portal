import { ServicesService } from './../services.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  constructor(private _service:ServicesService, private _router: Router) { }

  @ViewChild('email', {static: false}) email: ElementRef;
  @ViewChild('firstName', {static: false}) firstName: ElementRef;
  @ViewChild('lastName', {static: false}) lastName: ElementRef;
  @ViewChild('location', {static: false}) location: ElementRef;
  @ViewChild('cgiCode', {static: false}) cgiCode: ElementRef;
  @ViewChild('skills', {static: false}) skills: ElementRef;
  @ViewChild('designation', {static: false}) designation: ElementRef;
  @ViewChild('previousExperience', {static: false}) previousExperience: ElementRef;
  @ViewChild('totalExperience', {static: false}) totalExperience: ElementRef;
  
  message : String='';
  selectedDesignation: String='';

  res:any;
  
  ngOnInit() {
  }
 
  createUser(){
    let userObj = {
      firstName: this.firstName.nativeElement.value,
      lastName: this.lastName.nativeElement.value,
      email: this.email.nativeElement.value,
      location: this.location.nativeElement.value,
      designation: this.selectedDesignation,
      cgiCode: this.cgiCode.nativeElement.value,
      skills: this.skills.nativeElement.value,
      previousExperience: this.previousExperience.nativeElement.value,
      totalExperience: this.totalExperience.nativeElement.value
    };
    if(this.email.nativeElement.value == "" || this.firstName.nativeElement.value == "" || this.lastName.nativeElement.value == ""||this.location.nativeElement.value == ""||this.designation.nativeElement.value == ""||this.cgiCode.nativeElement.value == ""||this.previousExperience.nativeElement.value == ""||this.totalExperience.nativeElement.value == ""||this.skills.nativeElement.value == "" && this.previousExperience.nativeElement.value > this.totalExperience.nativeElement.value){
      alert("Fields are either empty or data is incorrect !");
      return ;
    }
    
    this._service.createUser(userObj).subscribe(res => 
    {
      console.log(res);
      if (res.status == 200){
      this.message="Added User!!"
    }
    else if(res.status == 401){
      this.message="Could not add User!!";
      localStorage.removeItem("JwtHrms");
      this._router.navigate(['/login']);
    }
    else if(res.status == 500){
      this.message = "Could not add user";
      console.log("Mail Not Sent");
    }
  });
 
}
 selectChangeHandler(event: any){
  this.selectedDesignation = event.target.value;
  }

  
}