import { ServicesService } from './../services.service';
import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { identifierModuleUrl, analyzeAndValidateNgModules } from '@angular/compiler';
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
    ) { }

  reviewArray = ["...", "...", "...", "...", "..."];
  toJump: string;
  idArray = [];
  keys = ["FormName", "Cycle", "TargetDate", "Status", "CreatedAt"];
  ngOnInit() {
    let current_route = this._router.url.split("/")[3];
    let id = this._service.jsonDecoder(localStorage.getItem("JwtHrms")).data._id;
    console.log(current_route);
    if(current_route === "allReviews"){
      this.sendRequest(id, "employeeId", "0");
      this.toJump = "/user/pendingBySelf/edit";
    }
    else if(current_route === "pendingByReviewer"){
      this.sendRequest(id, "reviewer", "1");
      this.toJump = "/user/pendingByReviewer/edit";
    }
    else if(current_route === "pendingByQAer"){
      this.sendRequest(id, "qualityAnalyst", "2");
      this.toJump = "/user/pendingByReviewer/edit";
    }
    // else if(current_route === "")
  }
 
  sendRequest(id, searchBy, flag){
    this._service.reviewData(id, searchBy).subscribe(res => {
      console.log(res);
      let customObject = [];
      let customObject2 = [];
      for(let i=0; i<res.length; i++){
        customObject[i] = {
          "FormName": res[i].formName,
          "Cycle": res[i].reviewCycle,
          "TargetDate": res[i].targetDate.substring(0, 10),
          "Status": res[i].status,
          "CreatedAt": res[i].date,
          "Edit": res[i]._id
        };        
      }
      console.log(customObject);
      this.reviewArray = customObject;
      this.idArray = customObject2;
      this.getKeys(this.reviewArray[0]);
    });
  }

  getValues(temp: any){
    if(temp != null || temp != undefined)
      return (Object.values(temp));
  }
  
  getKeys(temp: any){
    if(temp != null || temp != undefined)
      this.keys = Object.keys(temp);
  }  
}