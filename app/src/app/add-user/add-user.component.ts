import { ServicesService } from './../services.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { ViewChild, AfterViewInit } from '@angular/core';



@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  constructor(private _service:ServicesService) { }
  @ViewChild('email', {static: false}) email: ElementRef;
  @ViewChild('firstName', {static: false}) firstName: ElementRef;
  @ViewChild('lastName', {static: false}) lastName: ElementRef;
  @ViewChild('location', {static: false}) location: ElementRef;
  @ViewChild('cgiCode', {static: false}) cgiCode: ElementRef;
  @ViewChild('skills', {static: false}) skills: ElementRef;
  @ViewChild('designation', {static: false}) designation: ElementRef;
  @ViewChild('joined', {static: false}) joined: ElementRef;
  @ViewChild('previousExperience', {static: false}) previousExperience: ElementRef;
  @ViewChild('totalExperience', {static: false}) totalExperience: ElementRef;
  message : String=''

  res:any;
  
   ngOnInit() {
 }
 
createUser(){
  //   let userObj = {
  //     firstName: this.firstName.nativeElement.value,
  //     lastName: this.lastName.nativeElement.value,
  //     email: this.email.nativeElement.value,
  //     location: this.location.nativeElement.value,
  //     designation: this.designation.nativeElement.value,
  //     cgiCode: this.cgiCode.nativeElement.value,
  //     skills: this.skills.nativeElement.value,
  //     joined: this.joined.nativeElement.value,
  //     previousExperience: this.previousExperience.nativeElement.value,
  //     totalExperience: this.totalExperience.nativeElement.value
  //   };
  //   this._service.createUser(userObj).subscribe(res => 
  //   {console.log(res);
  //   if (res.status!=''){
  //     //alert("successfully added")
  //     this.message="Added User!!"
  //   }
  //   else{
  //     //alert("successfully added");
  //     this.message="Could not add User!!"
  //   }
  // });

}}
