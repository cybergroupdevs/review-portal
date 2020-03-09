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

  public pieChartLabels = ['Pending By Self', 'Pending By Reviewer', 'Pending By Qaer', 'Closed'];
  public pieChartData = [120, 150, 180, 90];
  public pieChartType = 'pie';

  public pieChartLabels2 = ['Pending By Self', 'Pending By Reviewer', 'Pending By Qaer', 'Closed'];
  public pieChartData2 = [120, 150, 180, 90];
  public pieChartType2 = 'pie';

  viewEmployee(){
    this._router.navigate(["/employees"]);
  }

  addEmployee(){
    this._router.navigate(["/addUser"]);
  }
  

}
