import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('email', {static: false}) email: ElementRef;
  @ViewChild('password', {static: false}) password: ElementRef;
  constructor(private _router: Router) { }

  ngOnInit() {
    //service call
  }
  
  onLogin(token){
    if(token != null){
      localStorage.setItem("JwtHrms", token);
      let designation = token.Designation;
      if(designation == "ADMIN"){
        this._router.navigate(['/admin']);
      }
      else{

      }
    }
  }

}
