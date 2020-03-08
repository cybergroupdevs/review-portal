import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { ServicesService } from './../services.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  status = 'ONLINE';
  isConnected = true;
  @ViewChild('email', {static: false}) email: ElementRef;
  @ViewChild('password', {static: false}) password: ElementRef;

  constructor(
    private connectionService: ConnectionService,
    private _service: ServicesService,
    private _router: Router
  ) { 
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = "ONLINE";
  }
  else {
    this.status = "OFFLINE";
  }
});
}

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
    //   else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value))
    //   { return (true) } alert("You have entered an invalid email address!") 
    //   return (false) 
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