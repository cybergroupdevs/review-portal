import { Router } from '@angular/router';
import { ServicesService } from './../services.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private _router: Router, 
    private _service: ServicesService) { }

  firstName: String;
  ngOnInit() {
    this.getUserName();
  }

  getUserName(){
    let name = this._service.jsonDecoder(localStorage.getItem("JwtHrms")).data.firstName;
    console.log(name);
    this.firstName = name;
  }

  myProfile(){
    this._router.navigate(["/user"])
  }

}
