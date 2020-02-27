import { ServicesService } from './../services.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-add-update-user',
  templateUrl: './add-update-user.component.html',
  styleUrls: ['./add-update-user.component.css']
  // providers:[ServicesService]

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
    this.userArray = res;
    console.log(res);
    this.setEmployeeData();
  });
}
setEmployeeData(){
 
  this.firstName= this.userArray.array.employeeData.firstName;
  this.lastName=this.userArray.array.employeeData.lastName;
  this.email =this.userArray.array.employeeData.email;
  this.location=this.userArray.array.employeeData.location;
  this.designation=this.userArray.array.employeeData.designation;
  this.division=this.userArray.array.employeeData.division;
  this.joined=this.userArray.array.employeeData.joined;
  this.competenceManager=this.userArray.array.employeeData.competenceManager;
  }
}


