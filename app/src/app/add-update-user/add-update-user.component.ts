import { ServicesService } from './../services.service';
import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef, AfterViewInit  } from '@angular/core';



@Component({
  selector: 'app-add-update-user',
  templateUrl: './add-update-user.component.html',
  styleUrls: ['./add-update-user.component.css']
})
export class AddUpdateUserComponent implements OnInit {
  res:any;
  @ViewChild('uemail', {static: false}) uemail: ElementRef;
  @ViewChild('upassword', {static: false}) upassword: ElementRef;
  @ViewChild('ufirstName', {static: false}) ufirstName: ElementRef;
  @ViewChild('ulastName', {static: false}) ulastName: ElementRef;
  @ViewChild('ulocation', {static: false}) ulocation: ElementRef;
  @ViewChild('udesignation', {static: false}) udesignation: ElementRef;
  @ViewChild('udivision', {static: false}) udivision: ElementRef;
  @ViewChild('ujoined', {static: false}) ujoined: ElementRef;
  @ViewChild('upreviousExperience', {static: false}) upreviousExperience: ElementRef;
  @ViewChild('utotalExperience', {static: false}) utotalExperience: ElementRef;
 
  
  
  constructor(private _service:ServicesService) { }
  
  userArray: any;
  firstName: any;
  lastName: any;
  email: any;
  //password: any;
  location:any;
  designation:any;
  //division: any;
  joined: any;
  previousExperience: any;
  totalExperience: any;
 
 
  ngOnInit() {
     this.loadEmployeeData()
 }
 loadEmployeeData(){
  this._service.employeeData().subscribe(res => {
    console.log(res);

    this.userArray = res;
    console.log(this.userArray)
    this.setEmployeeData();
  });
}
setEmployeeData(){
  console.log(this.userArray);
  this.firstName= this.userArray.firstName;
  this.lastName= this.userArray.lastName;
  this.email= this.userArray.email;
  //this.password= this.userArray.password.value;
  this.location= this.userArray.location;
  this.designation= this.userArray.designation;
  //this.division= this.userArray.division.value;
  this.joined= this.userArray.joined;
  this.previousExperience= this.userArray.previousExperience;
  this.totalExperience= this.userArray.totalExperience;
 
  
  }
  

  updateData(){
    let userObj = {
      firstName: this.ufirstName.nativeElement.value,
      lastName: this.ulastName.nativeElement.value,
      email: this.uemail.nativeElement.value,
      password: this.upassword.nativeElement.value,
      location: this.ulocation.nativeElement.value,
      designation: this.udesignation.nativeElement.value,
      division: this.udivision.nativeElement.value,
      joined: this.ujoined.nativeElement.value,
      previousExperience: this.upreviousExperience.nativeElement.value,
      totalExperience: this.utotalExperience.nativeElement.value,
      
     
      }
    console.log(userObj);
    this._service.updateData(userObj).subscribe(res =>  {
    console.log(this.res);
    if(res.status==200){
      console.log('Successful update!!');

    }
    else if(res.status == 401){
      console.log('Unauthorized');
     
    }

});
}   

}

