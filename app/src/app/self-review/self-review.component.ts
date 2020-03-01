import { Component, OnInit } from '@angular/core';
import { ServicesService } from './../services.service';

@Component({
  selector: 'app-self-review',
  templateUrl: './self-review.component.html',
  styleUrls: ['./self-review.component.scss']
})
export class SelfReviewComponent implements OnInit {

  constructor(private _service: ServicesService) { }
  
  ngOnInit() {
    this.getReview();
  }

  getReview() {
    this._service.getReviewById()
      .subscribe(data => {
        console.log(data);
      });
  }

}
