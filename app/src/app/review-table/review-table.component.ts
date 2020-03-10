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
  name = 'Angular';
  page = 1;
  pageSize = 10;
  items = [];

  constructor(
    private _router: Router, 
    private _service: ServicesService
    ) { }

  // reviewArray = ["...", "...", "...", "...", "..."];
  reviewArray = [];
  toJump: string;
  idArray = [];
  keys = ["FormName", "Cycle", "TargetDate", "Status", "CreatedAt"];
  current_route: string;
  
  ngOnInit() {
    this.current_route = this._router.url.split("/")[3];
    let id = this._service.jsonDecoder(localStorage.getItem("JwtHrms")).data._id;
    console.log(this.current_route);
    if(this.current_route === "allReviews"){
      this.sendRequest(id, "employeeId", "0");
      this.toJump = "/user/pendingBySelf/edit";
    }
    else if(this.current_route === "pendingByReviewer"){
      this.sendRequest(id, "reviewer", "1");
      this.toJump = "/user/pendingByReviewer/edit";
    }
    else if(this.current_route === "pendingByQAer"){
      this.sendRequest(id, "qualityAnalyst", "2");
      this.toJump = "/user/pendingByQa/edit";
    }
    else if(this.current_route === "closed"){
      this.sendRequest(id, "employeeId", "3");
      this.toJump = "/user/closed";
    }
  }
 
  sendRequest(id, searchBy, flag){
    this._service.reviewData(id, searchBy, flag).subscribe(res => {
      console.log(res);
      if(res.status == 200){
        let customObject = [];
        let customObject2 = [];
        for(let i=0; i<res.body.length; i++){
          customObject[i] = {
            "FormName": res.body[i].formName,
            "Cycle": res.body[i].reviewCycle,
            "TargetDate": res.body[i].targetDate.substring(0, 10),
            "Status": res.body[i].status,
            "CreatedAt": res.body[i].date.substring(0, 10),
            "Edit": res.body[i]._id
          };        
        }
        console.log(customObject);
        this.reviewArray = customObject;
        this.idArray = customObject2;
        this.getKeys(this.reviewArray[0]);
        if (res.body.length < 11) {
          document.getElementById('pageNo').style.visibility = "hidden"; 
        }
      }
      else if(res.status == 401){
        localStorage.removeItem("JwtHrms");
        this._router.navigate(['/login']);
      }    
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