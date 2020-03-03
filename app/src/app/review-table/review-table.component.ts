import { ServicesService } from './../services.service';
import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { identifierModuleUrl } from '@angular/compiler';
import { stringify } from 'querystring';

@Component({
  selector: 'app-review-table',
  templateUrl: './review-table.component.html',
  styleUrls: ['./review-table.component.scss']
})

export class ReviewTableComponent implements OnInit {
  constructor(
    private _router: Router, 
    private _service: ServicesService
    ) { 
  }

  ngOnInit() {
    let current_route = this._router.url.split("/")[3];
    let id = this._service.jsonDecoder(localStorage.getItem("JwtHrms")).data._id;
    console.log(current_route);
    if(current_route === "allReviews"){
      this.sendRequest(id, "employeeId");
    }
    else if(current_route === "pendingByReviewer"){
      this.sendRequest(id, "reviewer");
    }
    else if(current_route === "pendingByQAer"){
      this.sendRequest(id, "qualityAnalyst");
    }
  }

  sendRequest(id, searchBy){
    this._service.reviewData2(id, searchBy).subscribe(res => {
      console.log(res);
      let customObject = {
        "FormName": res[0].formName,
        "Cycle": res[0].reviewCycle,
        "TargetDate": res[0].targetDate,
        "Status": res[0].status
      }
    });

  getValues(temp: any){
    return (Object.values(temp));
  }

  // feedTable(obj: any){
  //   this.key = Object.keys(obj[0]);
  //   console.log(this.key);
  //   this.dummy = obj;
  // }
  
}
