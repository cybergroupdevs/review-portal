import { ServicesService } from './../services.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  @ViewChild("myTopnav", {static: false}) topnav: ElementRef;

  constructor(private _service: ServicesService) { }
  firstName: string;
  ngOnInit() {
    this.getUserName();
  }

  getUserName(){
    let name = this._service.jsonDecoder(localStorage.getItem("JwtHrms")).data.firstName;
    console.log(name);
    this.firstName = name;
  }
}
