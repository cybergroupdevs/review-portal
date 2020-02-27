import { ServicesService } from './../services.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-add-update-user',
  templateUrl: './add-update-user.component.html',
  styleUrls: ['./add-update-user.component.css']
})
export class AddUpdateUserComponent implements OnInit {
  constructor(private _service:ServicesService) { }
  userArray: any;
  firstName: String
  lastName: String
  email: String
  password: String
  location:String
  designation:String
  division: String
  joined: String
  competenceManager: String
  
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
}