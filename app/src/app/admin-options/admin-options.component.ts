import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-options',
  templateUrl: './admin-options.component.html',
  styleUrls: ['./admin-options.component.scss']
})
export class AdminOptionsComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  viewEmployee(){
    this._router.navigate(["/employees"]);
  }

  addEmployee(){
    this._router.navigate(["/addUser"]);
  }

}
