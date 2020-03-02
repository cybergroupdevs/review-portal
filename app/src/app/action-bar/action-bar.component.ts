import { ServicesService } from './../services.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent implements OnInit {

  constructor(private _service: ServicesService, private _router: Router) { }
  firstName: String;
  designation:String;

  ngOnInit() {
    this.getUserName();
    this.getDesignation();
    this.getQAerName();
    
  }
  getUserName(){
    let name = this._service.jsonDecoder(localStorage.getItem("JwtHrms")).data.firstName;
    console.log(name);
    this.firstName = name;
  }
  getDesignation(){
    let desig = this._service.jsonDecoder(localStorage.getItem("JwtHrms")).data.designation;
    console.log(desig);
    this.designation = desig;
  }
  getQAerName(){
    
  }
  

}
