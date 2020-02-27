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
  }
  // console.log(userObj);
  this._service.createUser(userObj).subscribe(res => this.res = res);
  console.log(this.res);
  
  
}
}
