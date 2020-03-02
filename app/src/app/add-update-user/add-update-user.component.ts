import { ServicesService } from './../services.service';
import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef, AfterViewInit  } from '@angular/core';



@Component({
  selector: 'app-add-update-user',
  templateUrl: './add-update-user.component.html',
  styleUrls: ['./add-update-user.component.css']
})
export class AddUpdateUserComponent implements OnInit {
  @ViewChild('firstName', {static: false}) firstName: ElementRef;
  @ViewChild('lastName', {static: false}) lastName: ElementRef;
  @ViewChild('password', {static: false}) password: ElementRef;
  @ViewChild('email', {static: false}) email: ElementRef;
  @ViewChild('location', {static: false}) location: ElementRef;
  @ViewChild('designation', {static: false}) designation: ElementRef;
  @ViewChild('division', {static: false}) division: ElementRef;
  @ViewChild('joined', {static: false}) joined: ElementRef;
  @ViewChild('previousExperience', {static: false}) previousExperience: ElementRef;
  @ViewChild('skills', {static: false}) skills: ElementRef;
  @ViewChild('competenceManager', {static: false}) competenceManager: ElementRef;
  @ViewChild('projectOwners', {static: false}) projectOwners: ElementRef;
  res:any;
  
  constructor(private _service:ServicesService) { }
  
  userArray: any;
  // firstName: String;
  // lastName: String;
  // email: String;
  // password: String;
  // location:String;
  // designation:String;
  // division: String;
  // joined: String;
 
  
   ngOnInit() {
     this.loadEmployeeData()
 }
 loadEmployeeData(){
  this._service.employeeData().subscribe(res => {
    console.log(res);

    this.userArray = res[0];
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
  this.previousExperience=this.userArray.previousExperience;
  this.skills=this.userArray.skills;
  this.competenceManager=this.userArray.competenceManager;
  this.projectOwners=this.userArray.projectOwners;
  }
  

  updateData(){
    let userObj = {
      firstName: this.firstName.nativeElement.value,
      lastName: this.lastName.nativeElement.value,
      password: this. password.nativeElement.value,
      email: this.email.nativeElement.value,
      location: this.location.nativeElement.value,
      designation: this.designation.nativeElement.value,
      division: this.division.nativeElement.value,
      joined: this.joined.nativeElement.value,
      previousExperience: this.previousExperience.nativeElement.value,
      skills: this.skills.nativeElement.value,
      competenceManager: this.competenceManager.nativeElement.value,
      projectOwners: this.projectOwners.nativeElement.value,
      }
    //console.log(userObj);
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

