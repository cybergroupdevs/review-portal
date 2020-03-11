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
     if(this.email.nativeElement.value=='' || this.password.nativeElement.value=='')
     {
       // Fetch all the forms we want to apply custom Bootstrap validation styles to
       var forms = document.getElementsByClassName('form-horizontal');
       // Loop over them and prevent submission
       var validation = Array.prototype.filter.call(forms, function(form) {
       form.addEventListener('submit', function(event) {
       if (form.checkValidity() === false) {
       event.preventDefault();
       event.stopPropagation();

       }
       form.classList.add('was-validated');
       }, false);
       });

     }
    else{
      this._service.checkUser(user).subscribe(res => {
        console.log("-------------------------");
        if(res.status == 200){
          // console.log(res.body.token);
          this.onLogin(res.body.token);
        }
        else if(res.status == 401){
          //alert("Unauthorized");
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