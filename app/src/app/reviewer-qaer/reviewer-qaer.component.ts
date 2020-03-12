import { Component, OnInit } from '@angular/core';
import { ServicesService } from './../services.service';
import { ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reviewer-qaer',
  templateUrl: './reviewer-qaer.component.html',
  styleUrls: ['./reviewer-qaer.component.scss']
})
export class ReviewerQaerComponent implements OnInit {
  res:any;
  constructor(private _service: ServicesService, private _activatedRoute: ActivatedRoute, private _router: Router) { }
  
  reviewQaerArray: any;
  empCode: string = null;
  reviewer: string=null;
  designation: string=null;
  joined:Date=null;
  totalExperience:number=null;
  revieweeName: string=null;
  qualityAnalyst: string=null;
  reviewCycle: string=null;
 
  reviewId: string;
  backButtonRoute: string;
  current_route: string;
  
  //It gets reviewee's data. It is the component with two cards.
  ngOnInit() {
    this.current_route = this._router.url.split('/')[2];
    console.log(this.current_route);
    if(this.current_route == "pendingBySelf"){
      this.backButtonRoute = "/user/reviews/allReviews";
    }
    else if(this.current_route == "pendingByReviewer"){
      this.backButtonRoute = "/user/reviews/pendingByReviewer";
    }
    else if(this.current_route == "pendingByQa"){
      this.backButtonRoute = "/user/reviews/pendingByQAer";
    }
    else if(this.current_route == "closed"){
      this.backButtonRoute = "/user/reviews/closed"
    }
    this.loadData();
  }

  loadData(){
    this._activatedRoute.params.subscribe(param => {
      console.log(param.id);
      this.reviewId = param.id;
    });
    this._service.reviewDataById(this.reviewId, this.current_route).subscribe(res => {
      console.log(res);
      if(res.status == 200){
        console.log("INside Success", res.body);
        this.reviewQaerArray = res.body[0];
        console.log(this.reviewQaerArray);
        this.setData();
      }
      else if(res.status == 404){
        this._router.navigate(['/404']);
      }
      else if(res.status == 401){
        localStorage.removeItem("JwtHrms");
        this._router.navigate(['/login']);
      }
    });
  }

  setData(){
    this.empCode = this.reviewQaerArray.employeeId.cgiCode;
    this.reviewer = this.reviewQaerArray.reviewer.firstName + " " + this.reviewQaerArray.reviewer.lastName;
  
    this.joined = this.reviewQaerArray.employeeId.joined.substring(0, 10);
    console.log(this.joined, "------> joined date")
    this.totalExperience = this.reviewQaerArray.employeeId.totalExperience;
    this.revieweeName = this.reviewQaerArray.employeeId.firstName + " " + this.reviewQaerArray.employeeId.lastName;
    this.qualityAnalyst = this.reviewQaerArray.qualityAnalyst.firstName + " " + this.reviewQaerArray.qualityAnalyst.lastName;
    this.designation = this.reviewQaerArray.employeeId.designation;
    this.reviewCycle = this.reviewQaerArray.reviewCycle;
  }

}