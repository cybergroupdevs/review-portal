import { ServicesService } from './../services.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartDataSets, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-admin-options',
  templateUrl: './admin-options.component.html',
  styleUrls: ['./admin-options.component.scss']
})

export class AdminOptionsComponent implements OnInit {
  
  constructor(private _router: Router, private _service: ServicesService) { }

  pieChartData = [0, 0, 0, 0];
  barChartData: ChartDataSets[] = [{data: [0, 0, 0, 0], label: "Reviews"}];
  pieChartLabels = ['Pending By Self', 'Pending By Reviewer', 'Pending By Qaer', 'Closed'];
  pieChartType = "pie";
  chartType = "bar";
  barChartLegend = true;
  chartColors: [
    {
      backgroundColor: 'rgba(83, 51, 237, 1)'
    }
  ];

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  ngOnInit() {
    this._service.getReviewCount().subscribe(res => {
      if(res.status == 200){
        this.pieChartData = res.body;
        this.barChartData = [{data: res.body, label: "Reviews"}];
        this.pieChartLabels = ['Pending By Self', 'Pending By Reviewer', 'Pending By Qaer', 'Closed'];
        this.pieChartType = "pie";
      }
      else if(res.status == 401){
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