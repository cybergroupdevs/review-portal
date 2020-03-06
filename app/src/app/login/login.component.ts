import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { ServicesService } from './../services.service';
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

  constructor(
    private _service: ServicesService,
    private _router: Router
  ) { }

  ngOnInit() {
  }
  
  checkUser(){
    let user = {
      "email": this.email.nativeElement.value,
      "password": this.password.nativeElement.value
    };
    let token = this._service.checkUser(user).subscribe(res => {
      console.log("-------------------------");
      console.log(res.body.token);
      // console.log(res["token"]);
      if(res.status == 200){
        this.onLogin(res.body.token);
      }
      else if(res.status == 401){
        alert("Unauthorized");
      }
    });    
  }

  onLogin(token){
    if(token != null){
      localStorage.setItem("JwtHrms", token);
      let decodedToken = this._service.jsonDecoder(token);
      let designation = decodedToken.data.designation;
      if(designation == "ADMIN"){
        this._router.navigate(['/admin']);
      }
      else{
        this._router.navigate(['/user']);
      }
    }
    else{
      console.log("Token is null");
    }
  }
}