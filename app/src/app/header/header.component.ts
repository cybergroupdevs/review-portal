import { ServicesService } from './../services.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _service: ServicesService) { }
  firstName: String;
  ngOnInit() {
    this.getUserName();
  }

  getUserName(){
    let name = this._service.jsonDecoder(localStorage.getItem("JwtHrms")).data.firstName;
    this.firstName = name;
  }

}
