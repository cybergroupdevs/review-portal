import { ServicesService } from './../services.service';
import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef, AfterViewInit  } from '@angular/core';



@Component({
  selector: 'app-add-update-user',
  templateUrl: './add-update-user.component.html',
  styleUrls: ['./add-update-user.component.css']
})
export class AddUpdateUserComponent implements OnInit {
  @ViewChild('firstname', {static: false}) firstname: ElementRef;
  @ViewChild('lastname', {static: false}) lastname: ElementRef;
  @ViewChild('email', {static: false}) email: ElementRef;
  @ViewChild('location', {static: false}) location: ElementRef;
  @ViewChild('designation', {static: false}) designation: ElementRef;
  @ViewChild('division', {static: false}) division: ElementRef;
  @ViewChild('competenceManager', {static: false}) competenceManager: ElementRef;
  @ViewChild('reviewer', {static: false}) reviewer: ElementRef;
  @ViewChild('qualityAnalyst', {static: false}) qualityAnalyst: ElementRef;
  
  constructor(private _service:ServicesService) { }
  userArray: any;
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  location:String;
  designation:String;
  division: String;
  joined: String;
  competenceManager: String;
  
   ngOnInit() {
     this.loadEmployeeData()
 }
 loadEmployeeData(){
  this._service.employeeData().subscribe(res => {
    this.userArray = res[0];
    console.log(res);
    this.setEmployeeData();
  });
}
setEmployeeData(){
  this.firstName= this.userArray.firstName;
  this.lastName=this.userArray.lastName;
  this.email =this.userArray.email;
  this.location=this.userArray.location;
  this.designation=this.userArray.designation;
  this.division=this.userArray.division;
  this.joined=this.userArray.joined;
  this.competenceManager=this.userArray.competenceManager;
  }

  update(){
    let userObj = {
      "firstname": this.firstname.nativeElement.value,
      "lastname": this.lastname.nativeElement.value,
      "email": this.email.nativeElement.value,
      "location": this.location.nativeElement.value,
      "designation": this.designation.nativeElement.value,
      "division": this.division.nativeElement.value,
      "competenceManager": this.competenceManager.nativeElement.value,
      "reviewer": this.reviewer.nativeElement.value,
      "qualityAnalyst": this.qualityAnalyst.nativeElement.value
     
    }
    console.log(userObj);
    this._service.updateData(userObj).subscribe(res => {
    console.log(res);
    if(res.status==200){
      console.log('Successful login');

    }
    else if(res.status == 401){
      console.log('Unauthorized');

    }

});
}   

}

