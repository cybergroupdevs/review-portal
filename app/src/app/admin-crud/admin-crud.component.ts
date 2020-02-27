import { ServicesService } from './../services.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-crud',
  templateUrl: './admin-crud.component.html',
  styleUrls: ['./admin-crud.component.scss']
})
export class AdminCrudComponent implements OnInit {

  constructor(private _service: ServicesService) { }

  usersArray: any;

  ngOnInit() {
    this.loadUsers();
  }
  
  loadUsers(){
    this._service.showAllEmployees().subscribe(res => {
      // console.log(res);
      this.usersArray = res;
      console.log(this.usersArray);
    });
  }

}