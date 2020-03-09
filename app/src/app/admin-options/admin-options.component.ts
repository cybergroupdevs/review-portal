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

  public pieChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public pieChartData = [120, 150, 180, 90];
  public pieChartType = 'pie';

  viewEmployee(){
    this._router.navigate(["/employees"]);
  }

  addEmployee(){
    this._router.navigate(["/addUser"]);
  }
  

}
