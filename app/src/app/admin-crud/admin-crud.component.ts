import { ServicesService } from './../services.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-crud',
  templateUrl: './admin-crud.component.html',
  styleUrls: ['./admin-crud.component.scss']
})
export class AdminCrudComponent implements OnInit {

  constructor(private _service: ServicesService, private _router: Router) { }

  usersArray: any;

  ngOnInit() {
    this.loadUsers();
  }
  
  loadUsers(){
    this._service.showAllEmployees().subscribe(res => {
      // console.log(res);
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