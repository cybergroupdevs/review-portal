import { ServicesService } from './../services.service';
import { ReviewTableComponent } from './../review-table/review-table.component';
import { Component,OnInit, ViewChild, ElementRef } from '@angular/core';
import { faEdit, faFile, faCheck, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-review-navbar',
  templateUrl: './review-navbar.component.html',
  styleUrls: ['./review-navbar.component.scss']
})

export class ReviewNavbarComponent implements OnInit {
  
  constructor(private _service: ServicesService) { }

  faFile = faFile;
  faEdit = faEdit;
  faFileSignature = faCheck;
  faRight = faAngleDoubleRight;

  ngOnInit(){


    // this._service.reviewData2(this._service.jsonDecoder(localStorage.getItem("JwtHrms")).data._id, "employeeId").subscribe(res => {
    //   console.log(res);
    // })
}

  }
  

