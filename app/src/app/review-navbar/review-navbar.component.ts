import { ReviewTableComponent } from './../review-table/review-table.component';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { faEdit, faFile, faCheck, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-review-navbar',
  templateUrl: './review-navbar.component.html',
  styleUrls: ['./review-navbar.component.scss']
})
export class ReviewNavbarComponent implements AfterViewInit {
  ngAfterViewInit(){
    // this.getNavHeight();
  }

  @ViewChild('mainnav', {static: false}) mNav: ElementRef;
  @ViewChild('sidenav', {static: false}) mSide: ElementRef;
  @ViewChild('navColumn',{static: false}) nColumn: ElementRef;


  constructor() { }

  faFile = faFile;
  faEdit = faEdit;
  faFileSignature = faCheck;
  faRight = faAngleDoubleRight;
  height: number;

  getNavHeight(){
    this.height = this.mNav.nativeElement.offsetHeight;
    const styles = {'margin-top' : this.height};
    console.log(this.height);
    this.mSide.nativeElement.style.marginTop = this.height+"px";
  }

  getReviews(status: number){
    // console.log(status);
    new ReviewTableComponent().refreshComponent(status);
  }

}
