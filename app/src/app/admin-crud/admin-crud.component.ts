import { __param } from 'tslib';
import { ServicesService } from './../services.service';
import { Router, ActivatedRoute } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
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
  
  usersArray =[];
  pager = {};
  searchInput = "";
  searchField: any;

  constructor(private _service: ServicesService, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.searchField = document.getElementById("search");
    this.searchField.addEventListener('input', this.searchUser.bind(this));
    this.loadUsers(0, this.page);
  }
  
  searchUser(e){
    console.log(this.searchInput);
    if(this.searchInput == ""){
      this.loadUsers(0, 1);
    }
    else{
      this.loadUsers(1, 1);
    }
  }

  loadUsers(status, page){
    if(status == 0){
      this._service.showAllEmployees(page).subscribe(res => {
        console.log(res, "my fav res--->>")
        if(res.status == 200){
          console.log(res, "my fav res--->>")
          this.pager = res.body.pager;
          this.usersArray = res.body.pageOfItems;
          //this.usersArray = res.body;
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
