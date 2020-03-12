import { ServicesService } from './../services.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


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
  // pageOfItems = [];

  constructor(private _service: ServicesService, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  

  ngOnInit() {
     this.loadUsers(this.page);
    //this._activatedRoute.queryParams.subscribe(x => this.loadUsers(x.page || 1));
  }
  
  loadUsers(page){
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

    // if (this.usersArray.length < 11) {
    //   document.getElementById('pageNo').style.visibility = "hidden"; 
    // }
  }

}


