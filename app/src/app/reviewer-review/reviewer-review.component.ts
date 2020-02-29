import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reviewer-review',
  templateUrl: './reviewer-review.component.html',
  styleUrls: ['./reviewer-review.component.scss']
})
export class ReviewerReviewComponent implements OnInit {

  constructor(private _router : Router) { }

  ngOnInit() {
  }
  addReviewerReview(){
    // this._router.navigate(["/employees"]);

  }

}
