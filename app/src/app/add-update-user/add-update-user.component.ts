// import { stat } from 'fs';
import { ServicesService } from './../services.service';
import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import $ from "jquery";

@Component({
  selector: 'app-add-update-user',
  templateUrl: './add-update-user.component.html',
  styleUrls: ['./add-update-user.component.scss']
})
export class AddUpdateUserComponent implements OnInit {

  res:any;
  @ViewChild('uemail', {static: false}) uemail: ElementRef;
  @ViewChild('ufirstName', {static: false}) ufirstName: ElementRef;
  @ViewChild('ulastName', {static: false}) ulastName: ElementRef;
  @ViewChild('ulocation', {static: false}) ulocation: ElementRef;
  @ViewChild('udesignation', {static: false}) udesignation: ElementRef;
  @ViewChild('ujoined', {static: false}) ujoined: ElementRef;
  @ViewChild('upreviousExperience', {static: false}) upreviousExperience: ElementRef;
  @ViewChild('utotalExperience', {static: false}) utotalExperience: ElementRef;
  @ViewChild('uskills', {static: false}) uskills: ElementRef;

  @ViewChild('updateButton', {static: false}) updateButton: ElementRef;
  
  constructor(private _service:ServicesService, private _router:Router, private _activatedRoute: ActivatedRoute) { }
  
  userArray: any;
  firstName: any;
  lastName: any;
  email: any;
  location:any;
  designation:any;
  joined: any;
  previousExperience: any;
  totalExperience: any;
  skills:any;

  //To Check for readonly in UI
  
  temp = true;
  temp2 = true;
  employeeId: string;
  loggedinUserId: string;
  calRoute: string;
  calRoute2: string;
  modalName: string;
  isVisible = false;
  isShow = false;

  user = true;
  admin = true;
  isReadonly = true;
 
  ngOnInit() {
    let current_route = this._router.url.split("/");
    this.loggedinUserId = this._service.jsonDecoder(localStorage.getItem("JwtHrms")).data._id;
    this.calRoute = current_route[1]+"/"+current_route[2];
    this.calRoute2 = current_route[1]+"/"+current_route[2]+"/"+current_route[3];

    if(this.calRoute == "user/profile"){
      this.user = false;
      this.loadEmployeeData(this.loggedinUserId);
    }
    else if(this.calRoute == "admin/profile"){
      this.admin = false;
      this.user = false;
      this.loadEmployeeData(this.loggedinUserId);
    }
    else if(this.calRoute2 == "admin/employee/edit"){
      this._activatedRoute.params.subscribe(param => {
        console.log(param.id);
        this.employeeId = param.id;
      });
      this.admin = false;
      this.user = false;
      this.isReadonly = false;
      this.loadEmployeeData(this.employeeId);
    }
    
  }

  loadEmployeeData(id: string){
    this._service.employeeData(id).subscribe(res => {
      console.log(res);
      if(res.status == 200){
        this.userArray = res.body;
        console.log(this.userArray);
        this.setEmployeeData();
      }
      else if(res.status == 401){
        localStorage.removeItem("JwtHrms");
        this._router.navigate(['/login']);
      }
      
    });
  }

  checkInput(){
    if(this.uemail.nativeElement.value == "" || this.ufirstName.nativeElement.value == "" || this.ulastName.nativeElement.value == "" || this.ulocation.nativeElement.value == "" || this.designation == "" || this.ujoined.nativeElement.value == "" || this.upreviousExperience.nativeElement.value == "" || this.utotalExperience.nativeElement.value == "" || this.uskills.nativeElement.value == ""  ){
      alert("Fields are either empty or data is incorrect !");
      return ;
    }
    else if(this.upreviousExperience.nativeElement.value > this.utotalExperience.nativeElement.value)
    {
      alert("Previous experience can't be more than total experience!");
      return ;
    }
    else{
      this.isVisible = true;
    }

}

  setEmployeeData(){
    console.log(this.userArray);
    this.firstName = this.userArray.firstName;
    this.lastName = this.userArray.lastName;
    this.email = this.userArray.email;
    this.location = this.userArray.location;
    this.designation = this.userArray.designation;
    this.joined = this.userArray.joined.substring(0, 10);
    this.previousExperience = this.userArray.previousExperience;
    this.totalExperience = this.userArray.totalExperience;
    this.skills = this.userArray.skills;
  }

  checkValidations(){
    if(this.uemail.nativeElement.value == "" || this.ufirstName.nativeElement.value == "" || this.ulastName.nativeElement.value == "" || this.ulocation.nativeElement.value == "" || this.designation == "" || this.ujoined.nativeElement.value == "" || this.upreviousExperience.nativeElement.value == "" || this.utotalExperience.nativeElement.value == "" || this.uskills.nativeElement.value == ""  ){
      alert("Fields are either empty or data is incorrect !");
      return ;
    }
    else if(this.upreviousExperience.nativeElement.value > this.utotalExperience.nativeElement.value)
    {
      alert("Previous experience can't be more than total experience!");
      return ;
    }
    
  }

  updateData(){
    this.isVisible = false;
    let userObj = {
      firstName: this.ufirstName.nativeElement.value,
      lastName: this.ulastName.nativeElement.value,
      email: this.uemail.nativeElement.value,
      location: this.ulocation.nativeElement.value,
      designation: this.designation,
      joined: this.ujoined.nativeElement.value,
      previousExperience: this.upreviousExperience.nativeElement.value,
      totalExperience: this.utotalExperience.nativeElement.value,
      skills: this.uskills.nativeElement.value,
      };    
    console.log(userObj);

    if(this.calRoute == "user/profile" || this.calRoute == "admin/profile"){
      this.sendUpdateRequest(userObj, this.loggedinUserId);
    }
    else if(this.calRoute2 == "admin/employee/edit"){
      this.sendUpdateRequest(userObj, this.employeeId);
    }
  }   

  closeModal(){
    console.log("Clicked");
    this.isVisible = false;
  }

  sendUpdateRequest(userObj: any, id: string){
    this._service.updateData(userObj,id).subscribe(res =>  {
      if(res.status == 200){
        console.log('Successful update!!');

        this.isShow = true;
          setTimeout(()=> { 
          this._router.navigate(["/admin/home"]);
          this.isShow = false;
          }, 1000);

      }
      else if(res.status == 401){
        alert("Unauthorized");
        localStorage.removeItem("JwtHrms");
        this._router.navigate(['/login']);
      }
    });
  }

  selectChangeHandlerDesignation(event: any){
    this.designation = event.target.value;
  }
}