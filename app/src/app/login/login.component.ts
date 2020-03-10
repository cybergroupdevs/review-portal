//import { ConnectionService } from 'ng-connection-service';
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

    //private connectionService: ConnectionService,
    private _service: ServicesService,
    private _router: Router
  ) {}
//   { 
//     this.connectionService.monitor().subscribe(isConnected => {
//       this.isConnected = isConnected;
//       if (this.isConnected) {
//         this.status = "ONLINE";
//   }
//   else {
//     this.status = "OFFLINE";
//   }
// });
//  }


  ngOnInit() {
  }
  
  checkUser(){
    let user = {
      "email": this.email.nativeElement.value,
      "password": this.password.nativeElement.value
    };
    if(this.email.nativeElement.value == "" || this.password.nativeElement.value == ""){
      alert("Empty Fields !");
      return ;
    }
    else{
      this._service.checkUser(user).subscribe(res => {
        console.log("-------------------------");
        if(res.status == 200){
          console.log(res.body.token);
          this.onLogin(res.body.token);
        }
        else if(res.status == 401){
          alert("Unauthorized");
        }
      });    
    }
    
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