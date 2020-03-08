import { ServicesService } from './../services.service';
import { Component, OnInit } from '@angular/core';
//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-admin-crud',
  templateUrl: './admin-crud.component.html',
  styleUrls: ['./admin-crud.component.scss']
})
export class AdminCrudComponent implements OnInit {
  name = 'Angular';
  page = 1;
  pageSize = 10;
  items = [];

  constructor(private _service: ServicesService) { 
  }

  usersArray: any;

  ngOnInit() {
    this.loadUsers();
  }
  
  loadUsers(){
    this._service.showAllEmployees().subscribe(res => {
      // console.log(res);
      this.usersArray = res;
      console.log(this.usersArray, "my data");
    });

    if (this.usersArray.length < 11) {
      document.getElementById('pageNo').style.visibility = "hidden"; 
    }
  }

}