import { ServicesService } from './../services.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-options',
  templateUrl: './admin-options.component.html',
  styleUrls: ['./admin-options.component.scss']
})
export class AdminOptionsComponent implements OnInit {
  
  constructor(private _router: Router, private _service: ServicesService) { }

  pieChartData = [0, 0, 0, 0];
  pieChartLabels = ['Pending By Self', 'Pending By Reviewer', 'Pending By Qaer', 'Closed'];
  pieChartType = "pie";
  chartType = "line";

  ngOnInit() {
    // console.log(localStorage.getItem("JwtHrms"));
    this._service.getReviewCount().subscribe(res => {
      console.log(res);
      if(res.status == 200){
        console.log(res.body);
        this.pieChartData = res.body;
        this.pieChartLabels = ['Pending By Self', 'Pending By Reviewer', 'Pending By Qaer', 'Closed'];
        this.pieChartType = "pie";
      }
      else if(res.status == 401){
        alert("Unauthorized");
        localStorage.removeItem("JwtHrms");
        this._router.navigate(['/login']);
      }
    });
  }

  viewEmployee(){
    this._router.navigate(["/employees"]);
  }

  addEmployee(){
    this._router.navigate(["/addUser"]);
  }
  

}
