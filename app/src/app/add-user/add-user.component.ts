import { ServicesService } from './../services.service';
import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';



@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  constructor(private _service:ServicesService) { }
  @ViewChild('email', {static: false}) email: ElementRef;
  @ViewChild('password', {static: false}) password: ElementRef;
  @ViewChild('firstName', {static: false}) firstName: ElementRef;
  @ViewChild('lastName', {static: false}) lastName: ElementRef;
  @ViewChild('location', {static: false}) location: ElementRef;
  @ViewChild('designation', {static: false}) designation: ElementRef;
  @ViewChild('division', {static: false}) division: ElementRef;
  @ViewChild('joined', {static: false}) joined: ElementRef;
  @ViewChild('cgiCode', {static: false}) cgiCode: ElementRef;
  @ViewChild('previousExperience', {static: false}) previousExperience: ElementRef;
  @ViewChild('totalExperience', {static: false}) totalExperience: ElementRef;
  message : String=''

  
  
  res:any;
  
   ngOnInit() {
     
 }
 
createUser(){
    let userObj = {
      firstName: this.firstName.nativeElement.value,
      lastName: this.lastName.nativeElement.value,
      email: this.email.nativeElement.value,
      password: this.password.nativeElement.value,
      location: this.location.nativeElement.value,
      designation: this.designation.nativeElement.value,
      division: this.division.nativeElement.value,
      joined: this.joined.nativeElement.value,
      cgiCode: this.cgiCode.nativeElement.value,
      previousExperience: this.previousExperience.nativeElement.value,
      totalExperience: this.totalExperience.nativeElement.value
    }
    // console.log(userObj);
    this._service.createUser(userObj).subscribe(res => 
    {console.log(res);
    if (res.status!=''){
      console.log("successfully added")
      this.message="success"

    }
    else{
      console.log("error occured");
      this.message="unsuccessful"
      
    }

  });
}}
