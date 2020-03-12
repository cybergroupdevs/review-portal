import { __param } from 'tslib';
import { ServicesService } from './../services.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

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
  usersArray =[];
  searchInput = "";
  searchField: any;

  constructor(private _service: ServicesService, private _router: Router) { }

  ngOnInit() {
    this.searchField = document.getElementById("search");
    this.searchField.addEventListener('input', this.searchUser.bind(this));
    this.loadUsers(0);
  }
  
  searchUser(e){
    console.log(this.searchInput);
    if(this.searchInput == ""){
      this.loadUsers(0);
    }
    else{
      this.loadUsers(1);
    }
  }

  loadUsers(status){
    if(status == 0){
      this._service.showAllEmployees().subscribe(res => {
        if(res.status == 200){
          this.usersArray = res.body;
          console.log(this.usersArray);
        }
        else if(res.status == 401){
          localStorage.removeItem("JwtHrms");
          this._router.navigate(['/login']);
        }
      });
    }
    else if(status == 1){
      this._service.searchEmployee(this.searchInput).subscribe(res => {
        if(res.status == 200){
          this.usersArray = res.body;
          console.log(this.usersArray);
        }
        else if(res.status == 401){
          localStorage.removeItem("JwtHrms");
          this._router.navigate(['/login']);
        }
      });
    }

  }

}
