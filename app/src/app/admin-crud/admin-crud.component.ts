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
    this.loadUsers();
  }
  
  searchUser(e){
    console.log(this.searchInput);
    var filter, table, tr, td, i, txtValue;
    filter = this.searchInput.toUpperCase();
    table = document.getElementById("employeeTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[2];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
          console.log(txtValue);
        } 
        else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  loadUsers(){
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

}
