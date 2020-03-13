import { ServicesService } from './../services.service';
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
    
  }

  changeActive(){
    var header = document.getElementById("myDIV");
    var links = header.getElementsByClassName("nav-link");
      for (var i = 0; i < links.length; i++) {
        links[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
        });
      }
  }

}
